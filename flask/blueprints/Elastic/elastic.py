from flask import Blueprint, request
from datetime import datetime, timedelta
from spacy.matcher import PhraseMatcher
from elasticsearch import Elasticsearch
import dateparser
import spacy
import json, os

es = Elasticsearch(os.environ.get('ELASTIC_SEARCH_URL'))
print("Connected to ElasticSearch\t", es.ping())

INDEX_NAME = "invictus25_rpfinder_latest"

search = Blueprint("search", __name__)

print("Loading NLP...")
nlp = spacy.load("en_core_web_lg")
print("Loaded!")

disaster_keywords = {
    "natural_disasters": [
        "earthquake", "flood", "tsunami", "landslide", "avalanche", 
        "hurricane", "typhoon", "cyclone", "tornado", "storm", 
        "wildfire", "forest fire", "drought", "volcano", "eruption"
    ],
    "man_made_disasters": [
        "explosion", "fire", "chemical spill", "gas leak", 
        "building collapse", "pollution", "oil spill", 
        "plane crash", "train derailment", "car crash"
    ],
    "violence_and_security": [
        "shooting", "attack", "terrorist", "riot", "protest", 
        "bomb", "hostage", "war", "gunfire", "looting", 
        "explosion", "armed"
    ],
    "health_disasters": [
        "pandemic", "epidemic", "outbreak", "infection", 
        "disease", "quarantine", "virus", "vaccine", 
        "contamination", "poisoning"
    ],
    "infrastructure_disasters": [
        "power outage", "blackout", "bridge collapse", 
        "roadblock", "traffic", "closure", "train derailment"
    ]
}

journals = {
    "Nature",
    "Science",
    "IEEE Transactions on AI",
    "PLOS ONE",
    "ACM Transactions on Computer Systems (TOCS)",
    "Proceedings of the National Academy of Sciences (PNAS)",
    "Journal of Machine Learning Research (JMLR)",
    "Neural Information Processing Systems (NeurIPS)",
    "International Journal of Robotics Research (IJRR)",
    "Cell",
    "The Lancet",
    "Journal of Artificial Intelligence Research (JAIR)",
    "Journal of Climate",
    "IEEE Transactions on Neural Networks and Learning Systems (TNNLS)",
    "Annual Review of Biochemistry",
    "Journal of High Energy Physics (JHEP)",
    "Physical Review Letters",
    "Advances in Cryptology (CRYPTO)"
}

matcher = PhraseMatcher(nlp.vocab)
patterns = [nlp.make_doc(text) for text in journals]
matcher.add("JOURNAL", None, *patterns)


def build_date_range_filter(start_date, end_date=None):
    if not start_date:
        return None

    date_filter = {"range": {"date": {}}}
    date_filter["range"]["date"]["gte"] = start_date.strftime("%Y-%m-%d")

    if end_date:
        date_filter["range"]["date"]["lte"] = end_date.strftime("%Y-%m-%d")

    return date_filter


def preprocess_query(query, entities):
    
    doc = nlp(query.lower())

    if contains_verified(query):
        entities['isVerified'] = True

    for ent in doc.ents:
        # Location
        # if ent.label_ == "GPE":
        #     entities["location"] = ent.text

        # Date
        if ent.label_ == "DATE":
            parsed_date = parse_date_range(ent.text)
            if parsed_date:
                entities["date"] = parsed_date

    if "recent" in query.lower():
        entities["date"] = (datetime.now(), None)

    return entities


def parse_date_range(phrase):
    today = datetime.now()
    start_date, end_date = None, None

    if "last week" in phrase:
        start_date = today - timedelta(days=today.weekday() + 7)
        end_date = start_date + timedelta(days=6)
    elif "this week" in phrase:
        start_date = today - timedelta(days=today.weekday())
        end_date = min(start_date + timedelta(days=6), today)  # Restrict end_date to today
    elif "past week" in phrase:
        start_date = today - timedelta(days=7)
        end_date = today
    elif "last month" in phrase:
        start_of_this_month = today.replace(day=1)
        end_of_last_month = start_of_this_month - timedelta(days=1)
        start_date = end_of_last_month.replace(day=1)
        end_date = end_of_last_month
    elif "this month" in phrase:
        start_date = today.replace(day=1)
        end_date = today
    elif "past month" in phrase:
        start_date = today - timedelta(days=30)
        end_date = today
    elif "last year" in phrase:
        start_date = today.replace(year=today.year - 1, month=1, day=1)
        end_date = today.replace(year=today.year - 1, month=12, day=31)
    elif "this year" in phrase:
        start_date = today.replace(month=1, day=1)
        end_date = today
    elif "yesterday" in phrase:
        start_date = today - timedelta(days=1)
        end_date = start_date
    elif "last weekend" in phrase:
        last_saturday = today - timedelta(days=today.weekday() + 2)
        last_sunday = last_saturday + timedelta(days=1)
        start_date = last_saturday
        end_date = last_sunday
    elif "this weekend" in phrase:
        last_saturday = today - timedelta(days=today.weekday() + 2)
        last_sunday = last_saturday + timedelta(days=1)
        start_date = last_saturday if last_saturday <= today else None
        end_date = last_sunday if last_sunday <= today else None
    elif "last quarter" in phrase:
        current_quarter = (today.month - 1) // 3 + 1
        start_month = 3 * (current_quarter - 2) + 1
        end_month = start_month + 2
        if start_month <= 0:
            start_month += 12
            end_month += 12
            year = today.year - 1
        else:
            year = today.year
        start_date = datetime(year, start_month, 1)
        end_date = datetime(year, end_month, 1) + timedelta(days=-1)
    elif "past 7 days" in phrase:
        start_date = today - timedelta(days=7)
        end_date = today
    elif "past 30 days" in phrase:
        start_date = today - timedelta(days=30)
        end_date = today
    elif "last 15 days" in phrase:
        start_date = today - timedelta(days=15)
        end_date = today
    elif "last 2 weeks" in phrase:
        start_date = today - timedelta(days=14)
        end_date = today
    elif "last 3 weeks" in phrase:
        start_date = today - timedelta(days=21)
        end_date = today
    else:
        months = [
            "january", "february", "march", "april", "may", "june",
            "july", "august", "september", "october", "november", "december"
        ]
        for i, month in enumerate(months, start=1):
            if f"last {month}" in phrase.lower():
                year = today.year - 1 if today.month <= i else today.year
                start_date = datetime(year, i, 1)
                if i == 12:  # December
                    end_date = datetime(year, 12, 31)
                else:
                    end_date = datetime(year, i + 1, 1) - timedelta(days=1)
                break

    return (start_date, end_date)

def contains_verified(text):
    keywords = {"verified", "authenticated", "certified", "approved", "validated"}
    words = set(text.lower().split())  # Convert text to lowercase and split into words
    return any(word in words for word in keywords)

def build_es_query(query_string, entities):

    query = {
        "bool": {"must": [], "filter": []}
        }
    
    query["bool"]["must"].append({"multi_match": {"query": query_string, "fields": ["title", "content", "description", "topic", "authors", "journal"],  "fuzziness": "AUTO"}})

    if entities['isVerified']:
        query["bool"]["must"].append({"term": {"isVerified": True}})

    if entities['date']:
        print(entities['date'])
        start_date, end_date = entities['date']
        query["bool"]["filter"].append({
            "range": {
                "date": {
                    "gte": start_date,
                    "lte": end_date
                }
            }
        })
    
    return {"query": query,
    # "sort": [
    #     {
    #         "_script": {
    #             "type": "number",
    #             "script": {
    #                 "source": """
    #                     if (doc['source.keyword'].value == 'RSS') {
    #                         return 0;
    #                     } else if (doc['source.keyword'].value == 'Twitter') {
    #                         return 1;
    #                     } else {
    #                         return 2;
    #                     }
    #                 """,
    #                 "lang": "painless"
    #             },
    #             "order": "asc"
    #         }
    #     }
    # ],
     "size": 1000}


def search_elastic_db(es, index, query):
    response = es.search(index=index, body=query)
    return response["hits"]["hits"]


@search.route("/")
def index():
    return "Elastic search pipeline"

@search.post("/elastic")
def elasticSearch():
    entities = {
        "journal": None,
        "authors": [],
        "content": None,
        "date": None,
        "description": None,
        "topic": None,
        "title": None,
        "isVerified": False
    }
    # print(request.form)
    data = request.json
    query_string = data.get('query', "")
    # print(True if request.form.get('nlp') else False)
    # print(request.form.get('nlp'))
    if request.form.get('nlp', False) == 'false':
        journal = request.form.get('journal')
        authors = request.form.get('authors')
        date = request.form.get('date')
        try:
            date = (dateparser.parse(date), None)
        except:
            date = None
        # print(date, type(date))
        content = request.form.get('content'),
        description = request.form.get('description'),
        topic = request.form.get('topic'),
        title = request.form.get('title'),
        isVerified = request.form.get('isVerified')

        entities = {
            "journal": journal if journal else None,
            "authors": authors if authors else [],
            "content": content if content else None,
            "date": date if date else None,
            "description": description if description else None,
            "topic": topic if topic else None,
            "title": title if title else None,
            "isVerified": isVerified if isVerified else False
        }
        print("Manual: ", entities)
    else:
        entities = preprocess_query(query_string, entities)
        print(entities)

    es_query = build_es_query(query_string, entities)
    print(es_query)

    results = search_elastic_db(es, INDEX_NAME, es_query)

    entities_formatted = entities
    entities_formatted['date'] = " to ".join(date.strftime("%d-%m-%Y") for date in entities_formatted['date'] if date) if entities_formatted['date'] else None
    
    tags = ""
    for result in results:
        result['_source']['objId'] = result['_id']
        tags += result['_source']['tags'] + ", "
    return {"parameters" : entities, "results": [result['_source'] for result in results], "tags": tags}

    # print(query_string, doc_type, location, date_range, priority)
    # return {'output': [query_string, location, doc_type, date_range, priority]} 

@search.get("/autocomplete")
def esautocomplete():
    query = request.args.get('query')
    baseQuery ={
        "_source": [],
        "size": 0,
        "min_score": 0.5,
        "query": {
            "bool": {
                "must": [
                    {
                        "match_phrase_prefix": {
                            "post_body": {
                                "query": "{}".format(query)
                            }
                        }
                    }
                ],
                "filter": [],
                "should": [],
                "must_not": []
            }
        },
        "aggs": {
            "auto_complete": {
                "terms": {
                    "field": "post_body.keyword",
                    "order": {
                        "_count": "desc"
                    },
                    "size": 25
                }
            }
        }
    }

    print(baseQuery)
    res = es.search(index=INDEX_NAME, body=baseQuery)
    return dict(res)

@search.post("/add-paper")
def add_paper():
    try:
        template = {
            "id": "",
            "journal": "",
            "authors": [],
            "content": "",
            "date": None,
            "description": "",
            "topic": "",
            "title": "",
            "isVerified": False
        }

        data = request.json
        for key in data.keys():
            template[key] = data[key]

        if isinstance(template["authors"], str):
            template["authors"] = [author.strip() for author in template["authors"].split(",")]

        es.index(index=INDEX_NAME, document=template, id=template["id"])
        return {"status": "Successful"}
    
    except Exception as e:
        print(e)
        return {"error": "Something went wrong"}

@search.post("/remove-post")
def removePost():
    try:
        objId = request.form.get("objId", "")
        if objId:
            response = es.delete(index=INDEX_NAME, id=objId)
            print(response)
        else:
            response = {"error": "No objId in form"}
        return {"success": json.dumps(response)}
    except Exception as e:
        print(e)
        return {"error": "Something went wrong"}
    
@search.get("/get-unverified-count")
def unverifiedCount():
    try:
        print(es.count(index=INDEX_NAME).get('count'))
        return {"count": es.count(index=INDEX_NAME).get('count')}
    except Exception as e:
        print(e)
        return {"error": "Couldn't get count"}

@search.post('/find-by-id')
def findByID():
    req = request.json
    print(req)
    received_id = req['id']
    print(received_id)
    try:
        response = es.count(index=INDEX_NAME, query={
        "match": {
          "post_id": received_id
        }
    })
        print(response['count'])
        return {"count": response['count']}
    except Exception as e:
        print(e)
        return {"error": "Couldn't get count"}
    
@search.post('/search-by-tags')
def searchByTags():
    data = request.json
    print(data)
    tags = data
    print(tags)
    try:
        response = es.search(index=INDEX_NAME, query={
            "match": {
                "tags": tags
        }
        })
        results = response["hits"]["hits"]
        print("response", results)
        return {"response": [result['_source'] for result in results]}
    except Exception as e:
        print(e)
        return {"error": "Couldn't get tags"}
