
import urllib.parse
import requests
import config
import random


def fetchReports(date, chosenCrimeName):
    
    dateStr = date.strftime('%Y-%m-%d')
    whereStatementUrlified = urllib.parse.quote_plus(f"OCC_DATE_EST >= date '{dateStr} 00:00:00' and OCC_DATE_EST < date '{dateStr} 11:59:59'")
    url = f'https://services.arcgis.com/S9th0jAJ7bqgIRjw/ArcGIS/rest/services/YTD_CRIME_WM/FeatureServer/0/query?where={whereStatementUrlified}&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&relationParam=&returnGeodetic=false&outFields=*&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&defaultSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=HOUR&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token='    
    resp = requests.get(url)
    
    if resp.status_code != 200:
        raise Exception("Failed",resp.text)
    
    reports_raw = resp.json()
    features_raw = filter_raw_report(reports_raw, chosenCrimeName)
    features_raw = limit_count(features_raw)
    
    return [{
        'x':r["geometry"]['x'],
        'y':r["geometry"]['y'],
        'hour':r["attributes"]["HOUR"],
        'neighborhood':remove_between_chars(r["attributes"]["NEIGHBOURHOOD_158"]),
        'crimeType':r["attributes"]["CRIME_TYPE"],
        'locationType':r["attributes"]["LOCATION_CATEGORY"], 
    } for r in features_raw]



def filter_raw_report(raw_reports, chosenCrimeName):
    n = []
    for report in raw_reports['features']:
        if not report.get("geometry"):
            continue
        if not (report["attributes"]["CRIME_TYPE"] in config.crimeTypes[chosenCrimeName].values()):
            continue
        n.append(report)
    return n


def remove_between_chars(string):
    result = ""
    flag = False   # True when between "(" and ")"
    
    for char in string:
        if char == "(":
            flag = True
        elif char == ")":
            flag = False
        elif not flag:
            result += char
            
    return result

def limit_count(reports, limit):
    while len(list) > limit:
        index_to_remove = random.randint(0, len(list) - 1)
        list.pop(index_to_remove)
    return list