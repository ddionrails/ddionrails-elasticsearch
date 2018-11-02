curl -XDELETE 'http://localhost:9200/ddionrails_data/'
# curl -XPOST 'http://localhost:9200/ddionrails_data/publications/1' -d @../testdata/json/publications.json
# curl -XPOST 'http://localhost:9200/ddionrails_data/questions/1' -d @../testdata/json/questions.json
# curl -XPOST 'http://localhost:9200/ddionrails_data/variables/1'
# PUT /ddionrails_data 
curl -XPUT 'http://localhost:9200/ddionrails_data/' -d '
{
    "settings": {
		"analysis": {
			"filter": {
				"autocomplete_filter": { 
					"type": "edge_ngram",
					"min_gram": 1,
					"max_gram": 20
				}
			},
			"analyzer": {
				"autocomplete": {
					"type":      "custom",
					"tokenizer": "standard",
					"filter": [
						"lowercase",
						"autocomplete_filter" 
					]
				}
			}
		}
	},
	"mappings": {
		"publications": {
			"properties": {
				"ENTRYTYPE": 	{ "type": "string"},
				"author": {
					"type": "string",
					"analyzer": "autocomplete",
					"search_analyzer": "standard",
                    "fields": {
                        "raw": {
                            "type": "string",
                            "index": "not_analyzed"
                        }
                    }
				},
				"title": {
					"type": "string",
					"analyzer": "autocomplete",
					"search_analyzer": "standard",
                    "fields": {
                        "raw": {
                            "type": "string",
                            "index": "not_analyzed"
                        }
                    }
				},
				"ID": 	        { "type": "string"},
                "namespace": {
					"type": "string",
					"analyzer": "autocomplete",
					"search_analyzer": "standard",
                    "fields": {
                        "raw": {
                            "type": "string",
                            "index": "not_analyzed"
                        }
                    }
				},
                "year": 		{ "type": "integer"}
			}
		},
		"questions": {
			"properties": {
				"study": {
					"type": "string",
					"analyzer": "autocomplete",
					"search_analyzer": "standard",
                    "fields": {
                        "raw": {
                            "type": "string",
                            "index": "not_analyzed"
                        }
                    }
				},
				"question": {
					"type": "string",
					"analyzer": "autocomplete",
					"search_analyzer": "standard",
                    "fields": {
                        "raw": {
                            "type": "string",
                            "index": "not_analyzed"
                        }
                    }
				},
				"analysis_unit": 		{ "type": "string"},
                "items": {
                    "properties": {
                        "text": {
                            "type": "string",
                            "analyzer": "autocomplete",
                            "search_analyzer": "standard",
                            "fields": {
                                "raw": {
                                    "type": "string",
                                    "index": "not_analyzed"
                                }          
                            }
                        },
                        "scale":        { "type": "string"},
                        "item":         { "type": "string"}
                    }
                },
				"namespace": {
					"type": "string",
					"analyzer": "autocomplete",
					"search_analyzer": "standard",
                     "fields": {
                        "raw": {
                            "type": "string",
                            "index": "not_analyzed"
                        }
                    }
				},
                "period": 		        { "type": "string"},
                "questionnaire": 		{ "type": "string"}
			}
		},
        "variables": {
			"properties": {
				"variable": {
					"type": "string",
					"analyzer": "autocomplete",
					"search_analyzer": "standard",
                     "fields": {
                        "raw": {
                            "type": "string",
                            "index": "not_analyzed"
                        }
                    }
				},
				"dataset": 		{ "type": "string"},
                "namespace": {
					"type": "string",
					"analyzer": "autocomplete",
					"search_analyzer": "standard",
                     "fields": {
                        "raw": {
                            "type": "string",
                            "index": "not_analyzed"
                        }
                    }
				},
                "study": {
					"type": "string",
					"analyzer": "autocomplete",
					"search_analyzer": "standard",
                     "fields": {
                        "raw": {
                            "type": "string",
                            "index": "not_analyzed"
                        }
                    }
				},
				"conceptual_dataset": 		{ "type": "string"},
				"analysis_unit": 	        { "type": "string"},
                "label": {
					"type": "string",
					"analyzer": "autocomplete",
					"search_analyzer": "standard",
                     "fields": {
                        "raw": {
                            "type": "string",
                            "index": "not_analyzed"
                        }
                    }
				},
				"period": 	              { "type": "string"}
			}
		}
	}
}
'

# Insert Data
curl -XPOST 'http://localhost:9200/ddionrails_data/publications/' -d '
{
    "ENTRYTYPE": "book",
    "author": "Max Mustermann",
    "title": "Sch\u00f6nes Buch",
    "ID": "pub1",
    "namespace": "soep-core",
    "year": 2014
}
'

curl -XPOST 'http://localhost:9200/ddionrails_data/publications/' -d '
{
    "ENTRYTYPE": "book",
    "author": "Max Mustermann",
    "title": "Ein anderes Buch",
    "ID": "pub2",
    "namespace": "soep-core",
    "year": 2015
}
'

curl -XPOST 'http://localhost:9200/ddionrails_data/questions/' -d '
{
    "study": "soep-core",
    "question": "q1",
    "analysis_unit": "p",
    "items": [
      {
        "text": "Wie Zufrieden bist Du mit den folgenden Bereichen Deines Lebens?",
        "scale": "txt",
        "item": "root"
      },
      {
        "text": "Familie",
        "scale": "cat",
        "item": "family"
      },
      {
        "text": "Arbeit",
        "scale": "cat",
        "item": "work"
      }
    ],
    "namespace": "soep-core",
    "period": "wave1",
    "questionnaire": "soep-core-2011-pe"
}
'

curl -XPOST 'http://localhost:9200/ddionrails_data/questions/' -d '
{
    "study": "soep-core",
    "question": "q2",
    "analysis_unit": "p",
    "items": [
      {
        "text": "Wie alt bist Du?",
        "scale": "num",
        "item": "root"
      }
    ],
    "namespace": "soep-core",
    "period": "wave1",
    "questionnaire": "soep-core-2011-pe"
}
'

curl -XPOST 'http://localhost:9200/ddionrails_data/variables/' -d '
{
  "variable": "var1",
    "dataset": "dataset1",
    "namespace": "soep-core",
    "study": "soep-core",
    "conceptual_dataset": "org",
    "analysis_unit": "p",
    "label": "First variable label",
    "period": "wave1"
}
'

curl -XPOST 'http://localhost:9200/ddionrails_data/variables/' -d '
{
    "variable": "var2",
    "dataset": "dataset1",
    "namespace": "soep-core",
    "study": "soep-core",
    "conceptual_dataset": "org",
    "analysis_unit": "p",
    "label": "Second variable label",
    "period": "wave1"
}
'
