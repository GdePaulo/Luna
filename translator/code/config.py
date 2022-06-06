scrapeTarget = dict(
    site = "https://www.henkyspapiamento.com/papiaments-zinnetjes/",
    tablerows = "//tbody//tr",
    rawdatafile="data/stparkpap/def-dump.txt",
    languages = ["pap", "nl", "en", "es", "pt"],
    nextbtn = "next-limit"
)

hny = dict(
    startline = 109,
    sep = "=",
    frmpapname = "pap-ned.txt",
    correction = {
        "ta" : "zijn",
        "calzoncillo {ll" : "onderbroek",
        "ablí" : "wablief?",
        "e" : "hij"
    }
)

crse = dict(
    name = "nl2"
)

ffy = dict(
    mark = "www.papiamento.aw"
)

def getBtn(btnnumber):
    btnpath = f"//li[@data-page='{btnnumber}']/a"
    return btnpath
