"""Curated chapter correspondences for the Bhaviṣya Purāṇa article.

The section extents follow the online Sanskrit edition. Quotation loci follow
the printed correspondence table (pp. 332–335) checked against its OCR;
the Sāmba concordance follows Studies in the Upapurāṇas, pp. 57–59.
Keep uncertain two-column OCR alignments out of the public data.
"""
import json
import re
from collections import defaultdict
from pathlib import Path

out = Path(__file__).parent / "articles/puranic-chronology/bhavisya-evidence.json"
edition = "https://www.wisdomlib.org/hinduism/book/bhavishya-purana-sanskrit"
sections = [
    ("I", "Brāhma-parvan", 216),
    ("II.1", "Madhyama-parvan · first bhāga", 21),
    ("II.2", "Madhyama-parvan · second bhāga", 20),
    ("II.3", "Madhyama-parvan · third bhāga", 20),
    ("III.1", "Pratisarga-parvan · first khaṇḍa", 7),
    ("III.2", "Pratisarga-parvan · second khaṇḍa", 35),
    ("III.3", "Pratisarga-parvan · third khaṇḍa", 32),
    ("III.4", "Pratisarga-parvan · fourth khaṇḍa", 26),
    ("IV", "Uttara-parvan / Bhaviṣyottara", 208),
]
records = []

def q(author, work, locus, refs, note="", label=""):
    """refs: semicolon-separated book.chapter:verse spans."""
    items = refs.split(";")
    has_absence = bool(re.search(r"\b(absent|no match|do not occur)\b", note, re.I))
    multiple_chapters = len(items) > 1
    for item in items:
        book_chapter, passage = item.strip().split(":", 1)
        book, chapter = book_chapter.rsplit(".", 1)
        displayed_note = (
            "In this cited group (the unmatched lines cannot be assigned to this chapter): " + note
            if has_absence and multiple_chapters else note
        )
        records.append(dict(kind="quotation", section=book, chapter=int(chapter),
                            passage=passage.strip(), work=work, author=author,
                            locus=locus, note=displayed_note, label=label,
                            missing=has_absence and not multiple_chapters))

def p(work, locus, refs, note=""):
    for item in refs.split(";"):
        book_chapter, passage = item.strip().split(":", 1)
        book, chapter = book_chapter.rsplit(".", 1)
        records.append(dict(kind="parallel", section=book, chapter=int(chapter),
                            passage=passage.strip(), work=work, locus=locus, note=note))

# Citations in later works. A page/folio refers to the cited work, not a
# page of the Bhaviṣya. A reference to a whole chapter is stated explicitly.
q("Vijñāneśvara", "Mitākṣarā on Yājñavalkyasmṛti", "on Yāj. III.6", "I.32:56b–57a")
q("Jīmutavāhana", "Kālaviveka", "p. 408", "I.21:31, 32b–34a")
q("Jīmutavāhana", "Kālaviveka", "pp. 411–412", "I.31:1–2, 4–10, 16", "The final line beginning snāna-dānādikaṃ karma has no match in this chapter.")
q("Jīmutavāhana", "Kālaviveka", "pp. 413–414", "I.82:1a, 1b–3a, 3b–4a; I.86:67–69; I.87:1–2; I.37:3a", "Four lines beginning supte janārdane deve are absent from the received text.")
q("Jīmutavāhana", "Kālaviveka", "p. 414", "I.39:1, 9b–10a, 12a; I.40:1a, 2a")
q("Jīmutavāhana", "Kālaviveka", "p. 415", "I.81:2–3, 14b, 15b–16a; I.96:3–4a")
q("Jīmutavāhana", "Kālaviveka", "pp. 415–416", "I.97:1; I.98:1; I.99:1–2; I.100:1; I.101:1–2a, 20b–21a", "A line beginning snāna-dānādikaṃ sarvam is absent from the received text.")
q("Jīmutavāhana", "Kālaviveka", "p. 417", "I.106:4b–7a", "Seven lines beginning śukla-pakṣasya saptamyām have no match here.")
q("Jīmutavāhana", "Kālaviveka", "p. 492", "I.81:2", "The verse beginning amā vai soma-vāreṇa has no match here.")
q("Jīmutavāhana", "Kālaviveka", "pp. 507–508", "I.99:1–2; I.106:4b–6a")

ap = "Commentary on Yājñavalkyasmṛti"
q("Aparārka", ap, "p. 15", "I.4:87b–89")
q("Aparārka", ap, "p. 26", "I.3:6–7")
q("Aparārka", ap, "p. 39", "I.3:68b–69")
q("Aparārka", ap, "p. 41", "I.3:85b–86")
q("Aparārka", ap, "p. 52", "I.4:57", "An additional verse in the citation is absent from the received chapter.")
q("Aparārka", ap, "p. 60", "I.3:32b–33")
q("Aparārka", ap, "p. 239", "I.184:18b–19a")
q("Aparārka", ap, "p. 241", "I.186:20b–27a")
q("Aparārka", ap, "p. 283", "I.184:35b–37, 41")
q("Aparārka", ap, "pp. 626–627", "I.181:23–24a, 26a, 28–32")
q("Aparārka", ap, "p. 1186", "I.65:9b–10a, 10, 13a, 14–15", "A line in the citation has no match here.")

# The three loci below occupy adjacent columns in the printed table.
q("Devaṇṇabhaṭṭa", "Smṛticandrikā", "I, p. 53", "I.181:34")
q("Devaṇṇabhaṭṭa", "Smṛticandrikā", "III.i, p. 54", "I.4:4; I.103:19b–20a", "The text is given as an alternative placement in the received Bhaviṣya.")
q("Devaṇṇabhaṭṭa", "Smṛticandrikā", "IV, pp. 163–164", "I.93:74b–75a")

# The verse-to-chapter matches in the Dānasāgara list are legible, but the
# alignment of individual folios to each match is not recoverable from the
# two-column OCR. Give the full folio group and explicitly flag that limit.
ds = "fols. 14b, 23a, 276b, 287b–290a; individual folio unresolved"
ds_note = "The Bhaviṣya verse location is identified; the individual Dānasāgara folio is unresolved within this cited group."
q("Ballālasena", "Dānasāgara", ds, "I.93:30, 35, 37, 42–45, 49–51, 58, 59b, 60–61a, 62, 68–71", ds_note)
q("Ballālasena", "Dānasāgara", ds, "I.103:39b–41a", ds_note)
q("Ballālasena", "Dānasāgara", ds, "I.118:50b–52a", ds_note)

hem = "Caturvargacintāmaṇi"
q("Hemādri", hem, "vol. I, p. 40", "I.3:6–7a")
q("Hemādri", hem, "vol. I, p. 62", "I.181:28–29")
q("Hemādri", hem, "vol. I, p. 63", "I.184:5; I.4:117b–118a, 120b–121a; I.184:29b–30a", "Three of five quoted verses correspond at these alternative locations; two do not.")
q("Hemādri", hem, "vol. I, pp. 432–434", "I.186:24")
q("Hemādri", hem, "vol. I, p. 466", "I.186:21b–22a")
# This page's right column likewise has more passages than can be matched
# with confidence to p. 467. Keep later individually paged matches below.
q("Hemādri", hem, "vol. I, pp. 467–468", "I.170:1–2a, 3b–5")
q("Hemādri", hem, "vol. I, p. 504", "I.172:23b–25a")
q("Hemādri", hem, "vol. I, p. 663", "IV.168:4–5")
q("Hemādri", hem, "vol. I, p. 664", "I.169:1–2")
q("Hemādri", hem, "vol. I, p. 671", "IV.108:10b–12a")
q("Hemādri", hem, "vol. I, p. 673", "IV.168:12b–13a")
q("Hemādri", hem, "vol. I, p. 680", "I.172:25b–26a", "An additional verse beginning dadyād guṇavate is absent.")
q("Hemādri", hem, "vol. I, pp. 1031–1033", "IV.128:2–11, 13–18", "A line beginning ato drumāḥ on p. 1033 is absent.")

hi = "vol. II, part i"
q("Hemādri", hem, f"{hi}, pp. 4–5", "I.181:10–14", "Two lines beginning varṇa-dharmaḥ sa uktas tu are absent.")
q("Hemādri", hem, f"{hi}, p. 10", "I.181:7a")
q("Hemādri", hem, f"{hi}, pp. 19–20", "I.4:87b–89")
q("Hemādri", hem, f"{hi}, p. 23", "I.2:1–3")
q("Hemādri", hem, f"{hi}, p. 27", "I.181:34")
q("Hemādri", hem, f"{hi}, pp. 31–32", "I.181:38b–40a")
q("Hemādri", hem, f"{hi}, pp. 50–51", "I.97:20; I.98:9–10a, 3b–4", "A further quoted verse has no match; the verse numbers in the I.100 line of this entry are indistinct.")
q("Hemādri", hem, f"{hi}, pp. 229–231", "I.214:3–end")
q("Hemādri", hem, f"{hi}, pp. 345–348", "I.18:1–end", "Continuous match reported through the end of the received chapter.")
q("Hemādri", hem, f"{hi}, pp. 381–382", "I.19:85b–90, 91b–93a")
q("Hemādri", hem, f"{hi}, pp. 474–477", "I.21:1–12, 13b–14a, 15b–17a, 18–20, 24–31, 34b–36", "An additional verse beginning yo ’syām dadāti on p. 477 is absent.")
q("Hemādri", hem, f"{hi}, pp. 512–513", "I.31:1–5")
q("Hemādri", hem, f"{hi}, pp. 513–514", "I.81:6–10")
q("Hemādri", hem, f"{hi}, pp. 514–519", "I.31:11–13, 14b–31a, 35b–36b, 37b–63", "A few lines on pp. 517 and 519 have no match.")
q("Hemādri", hem, f"{hi}, pp. 519–520", "I.22:1–2")
q("Hemādri", hem, f"{hi}, pp. 537–543", "IV.37:1–8, 11–end", "A line on p. 538 and one additional verse have no match.")
q("Hemādri", hem, f"{hi}, pp. 557–560", "I.32:1–5a, 6b–10, 38b–41a, 50–51a", "Eleven further quoted lines on p. 559 have no match.")
q("Hemādri", hem, f"{hi}, pp. 560–563", "I.32:42b–47a, 48–54a", "Two lines and seven further verses on p. 562 have no match.")
q("Hemādri", hem, f"{hi}, pp. 563–564", "I.37:1–end; I.38:1–4, 5b–end", "One line and one verse in the citation have no match.")
q("Hemādri", hem, f"{hi}, p. 567", "I.37:1–end", "Two further lines have no match.")
q("Hemādri", hem, f"{hi}, pp. 604–605", "I.89:1–11, 12b–end", "Quoted there under the title Bhaviṣyottara; three quoted lines have no match.", "as Bhaviṣyottara")
q("Hemādri", hem, f"{hi}, pp. 656–659", "I.69:1–25")
q("Hemādri", hem, f"{hi}, pp. 659–660", "I.61:1–15")
q("Hemādri", hem, f"{hi}, pp. 660–663", "I.81:1; I.96:3–4, 7–13a, 15b–16a, 17–end", "Two further lines on p. 661 have no match.")
q("Hemādri", hem, f"{hi}, pp. 663–664", "I.81:2–4, 7–11a, 12–15a")
q("Hemādri", hem, f"{hi}, pp. 664–667", "I.97:1–11a, 12–end")
q("Hemādri", hem, f"{hi}, pp. 667–669", "I.98:1–14, 15b–16, 18–end")
q("Hemādri", hem, f"{hi}, p. 669", "I.99:1–4, 6–end")
q("Hemādri", hem, f"{hi}, pp. 669–671", "I.100:1–2, 3b–end", "Quoted there under Bhaviṣyottara; three further lines on p. 671 have no match.", "as Bhaviṣyottara")
q("Hemādri", hem, f"{hi}, pp. 671–674", "I.101:1–9, 11b–12a, 13–22a", "The matching order of verses differs from the received chapter.")
q("Hemādri", hem, f"{hi}, pp. 674–676", "I.166:1–15a", "Additional cited lines on pp. 674–676 have no match.")
q("Hemādri", hem, f"{hi}, pp. 676–679", "I.167:1–end", "Several cited lines on pp. 677–678 have no match.")
q("Hemādri", hem, f"{hi}, pp. 679–685", "I.68:unspecified; I.69:unspecified; I.70:1–11", "Multiple shared verses; a complete verse by verse alignment is not given.")
q("Hemādri", hem, f"{hi}, pp. 685–687", "I.70:unspecified", "Shared passages, with no exact verse limits in this entry.")
q("Hemādri", hem, f"{hi}, pp. 687–690", "I.208:3–22a, 30b–34a")
q("Hemādri", hem, f"{hi}, pp. 690–696", "I.212:unspecified; I.213:1–40a", "Correspondence noted for both chapters; I.212 is not aligned verse by verse.")
q("Hemādri", hem, f"{hi}, pp. 696–697", "I.213:40b–end")
q("Hemādri", hem, f"{hi}, pp. 724–726", "I.209:1–14", "Two additional lines on p. 725 have no match.")
q("Hemādri", hem, f"{hi}, p. 726", "I.197:25b–27")
q("Hemādri", hem, f"{hi}, pp. 726–728", "I.65:1–7a, 19–20, 21a, 21b–23, 24–end", "A further line on p. 726 has no match.")
q("Hemādri", hem, f"{hi}, pp. 728–731", "I.105:1–11a, 12b, 14b–16, 17–20a, 25–26, 29")
q("Hemādri", hem, f"{hi}, pp. 731–734", "I.64:56b–60, 61b–end", "A line on p. 732 has no match.")
q("Hemādri", hem, f"{hi}, pp. 735–736", "I.108:1–11")
q("Hemādri", hem, f"{hi}, pp. 736–738", "I.104:2–end")
q("Hemādri", hem, f"{hi}, pp. 740–741", "I.106:4b–10a, 11b–14")
q("Hemādri", hem, f"{hi}, p. 741", "I.110:1–5, 7a, 8b")
q("Hemādri", hem, f"{hi}, pp. 741–743", "I.111:1–end", "Two additional cited verses on pp. 742–743 have no match.")
q("Hemādri", hem, f"{hi}, pp. 744–746", "I.119:10b–17a")
q("Hemādri", hem, f"{hi}, pp. 748–753", "I.165:1–14, 15–17a, 18–21, 22b–end", "Eighteen further lines on pp. 750–751 and three on p. 752 have no match.")
q("Hemādri", hem, f"{hi}, pp. 754–756", "I.109:1a, 2b–13a")
q("Hemādri", hem, f"{hi}, pp. 760–763", "I.47:50b–end", "The first five cited lines have no match.")

hii = "vol. II, part ii"
q("Hemādri", hem, f"{hii}, pp. 424–440", "I.55:unspecified; I.56:unspecified; I.57:unspecified; I.58:1–23", "An extensive, variant correspondence; individual verse limits for chs. 55–57 are not specified.")
q("Hemādri", hem, f"{hii}, pp. 520–521", "I.82:1, 3, 5–6a, 7b–8a", "An additional quoted verse has no match.")
q("Hemādri", hem, f"{hii}, pp. 522–523", "I.82:8b–10a, 12a, 15b–24", "Some intermediate verse numbers in the printed alignment are indistinct.")
q("Hemādri", hem, f"{hii}, pp. 523–524", "I.83:1–3, 4b–5, 6a; I.68:3b–4a")
q("Hemādri", hem, f"{hii}, p. 524", "I.86:11b–12a, 15b–17", "For the first of two citations, the remaining lines have no match.")
q("Hemādri", hem, f"{hii}, pp. 525–526", "I.89:2b–3, 5–7")
q("Hemādri", hem, f"{hii}, p. 526", "I.90:1–3a, 5")
q("Hemādri", hem, f"{hii}, pp. 526–527", "I.91:1–4a, 6", "Quoted there under Bhaviṣyottara.", "as Bhaviṣyottara")

q("Mādhavācārya", "Commentary on Parāśarasmṛti", "vol. I, part i, p. 324", "I.4:50")
q("Mādhavācārya", "Commentary on Parāśarasmṛti", "vol. I, part ii, pp. 24–25", "I.3:6–7a")
q("Mādhavācārya", "Commentary on Parāśarasmṛti", "vol. I, part ii, p. 347", "I.4:120b–121a; I.184:29b–30a", "The same verse occurs at both places in this Purāṇa.")
q("Mādhavācārya", "Commentary on Parāśarasmṛti", "vol. I, part ii, p. 378", "I.186:21b–22a")
q("Mādhavācārya", "Commentary on Parāśarasmṛti", "vol. I, part ii, p. 382", "I.186:24")
q("Madanapāla", "Madanapārijāta", "p. 355", "I.8:6–7a")
q("Madanapāla", "Madanapārijāta", "p. 411", "I.32:56b–57a")
q("Madanapāla", "Madanapārijāta", "p. 470", "I.183:9–21a", "A further line in the citation has no match.")
q("Kullūkabhaṭṭa", "Commentary on Manusmṛti", "on Manu II.1", "I.181:7–8")
q("Kullūkabhaṭṭa", "Commentary on Manusmṛti", "on Manu II.13", "I.181:17a")
q("Kullūkabhaṭṭa", "Commentary on Manusmṛti", "on Manu II.25", "I.181:10–14", "One further line has no match.")
q("Kullūkabhaṭṭa", "Commentary on Manusmṛti", "on Manu III.7", "I.181:24a")

# Independently locatable quotation of the Madhyama-parvan, outside the
# Brahma/Uttara concordance table.
q("Raghunandana", "Smṛtitattva", "vol. II, p. 509", "II.3.18:1, 4–10", "Two lines of this citation do not occur in the received chapter; it names the third bhāga's ninth chapter, whose numbering differs.")

# Parallels with another Purāṇa. The Sāmba concordance records shared
# material, not a claim that every verse in the indicated Bhaviṣya chapter is
# identical. Numbering and extent differ between editions.
p("Sāmba Purāṇa", "ch. 2, except 21b", "I.66:42–46, 49–63a")
p("Sāmba Purāṇa", "ch. 3, except 10–12, 26–27, 30b, 31b–32a, 52b, 56", "I.72:3, 6–14a; I.73:1, 2b–10a, 14–24a, 25–41a, 43b–45, 49–50")
p("Sāmba Purāṇa", "ch. 4", "I.74:1–4, 7–24, 26a, 28b–29")
p("Sāmba Purāṇa", "ch. 5, with omissions", "I.67:3–6a, 7b–10, 12b–15, 25b–32a")
p("Sāmba Purāṇa", "ch. 6, except 12b", "I.75:1, 3a, 4–6a, 7a, 10–13, 16–17; I.76:1–5a, 6b–8a, 10b–15")
p("Sāmba Purāṇa", "ch. 7, except 37, 62b–71", "I.76:16b–20a; I.77:1–21; I.78:1–24a, 25b–41a")
p("Sāmba Purāṇa", "ch. 8, except 13b and second half of 13a", "I.54:2–14, except final quarter of v. 14")
p("Sāmba Purāṇa", "ch. 8, except 11b–13", "I.78:43b–53b")
p("Sāmba Purāṇa", "ch. 8, vv. 1–4a, 5, 6b–7", "I.161:2–5, 6b–7")
p("Sāmba Purāṇa", "ch. 9, except 11a, 15–43", "I.78:53b–66, 67–69, 71–73, 75–84a")
p("Sāmba Purāṇa", "ch. 10", "I.79:1–22a")
p("Sāmba Purāṇa", "ch. 11, with omissions", "I.79:23–58, 63a, 64–79a, 78b–81a, 82b–83a; I.124:32a")
p("Sāmba Purāṇa", "ch. 12, except 3, 20a", "I.121:1–13, 15b–19a, 20b–28")
p("Sāmba Purāṇa", "ch. 13, except 9b–11", "I.122:all except 8b–9")
p("Sāmba Purāṇa", "ch. 14, except 17b, 21", "I.123:1–19, 21b–22, 23b–34")
p("Sāmba Purāṇa", "ch. 15, except 16, 26", "I.123:36–40a, 41a, 42a, 43b–44a, 45–66a with gaps")
p("Sāmba Purāṇa", "ch. 16, except 14–16, 19b–20a, 33", "I.124:1–10, 13–15a, 16, 25b–28, 31, 34–38, 40")
p("Sāmba Purāṇa", "ch. 18, with omissions", "I.125:2, 4, 7–25a, 26b–38a, 39–63a, 64b–71")
p("Sāmba Purāṇa", "ch. 19, except 2–3, 15a", "I.126:1, 3–6a, 7–9a, 10b–28")
p("Sāmba Purāṇa", "ch. 20, with omissions", "I.53:35b–44, 45b–51a")
p("Sāmba Purāṇa", "ch. 21, with omissions", "I.52:8–23, 24b–25a, 28–45a, 46–49a; I.53:10–13a, 21–35a")
p("Sāmba Purāṇa", "ch. 24, with omissions", "I.127:3–9, 10b–27a, 28–29a, 30–36a")
p("Sāmba Purāṇa", "ch. 25", "I.128:substantial passage")
p("Sāmba Purāṇa", "ch. 26, with omissions", "I.129:substantial passage; I.139:1–9a, 10b, 70b–81, 83–97")
p("Sāmba Purāṇa", "ch. 27, with omissions", "I.140:20–23; I.144:9b–16a, 17–24, 25b–26")
p("Sāmba Purāṇa", "ch. 28, with omissions", "I.145:2–7, 8b–21, 22b–24, 25–27")
p("Sāmba Purāṇa", "ch. 29, except 1–7, 20a", "I.130:42–56, 59–60a, 63b")
p("Sāmba Purāṇa", "ch. 30, except 28b–29, 31b", "I.131:1a, 2–3a, 5–13a, 19–20, 23–30, 36–41, 46–47")
p("Sāmba Purāṇa", "ch. 32, with omissions", "I.132:1–24")
p("Sāmba Purāṇa", "ch. 33, with omissions", "I.133:1a; I.135:6b–8, 9b–16, 20b–27a, 51–52a; I.136:2–7a, 9b–11a, 25b–26a, 37b–52a, 67–73, 75b–79a, 82; I.137:1–2")
p("Sāmba Purāṇa", "ch. 34, with omissions", "I.138:1a, 2–4, 21b–22a, 34a, 35–38a, 39a, 40b, 41b, 47, 53a, 64–69a, 70a, 71a, 72a, 73a, 76")
p("Sāmba Purāṇa", "ch. 35, with omissions", "I.55:23b–25, 28b–29a, 30b–32, 36b–37a, 39a, 48b–75; I.56:7b–31, 47–51a; I.57:27b, 31a; I.58:1a, 2, 18–20a")
p("Sāmba Purāṇa", "ch. 36, with omissions", "I.58:22b–45 with gaps")
p("Sāmba Purāṇa", "ch. 38, with omissions", "I.143:5b–13, 14b–41a, 46–55a")
p("Sāmba Purāṇa", "ch. 46, with omissions", "I.80:2, 9–11, 14, 16–18; I.81:2–3, 15b–16a; I.82:3a, 6a; I.93:1, 3–5a, 7, 9a, 15b–16a, 26a, 28, 30, 32a, 42a, 64, 66")
p("Sāmba Purāṇa", "ch. 84, opening verses", "I.208:4–35 with gaps; I.209:1–16a with gaps; I.120:1a, 2b–3a, 4")

# Independent Purāṇic parallels mentioned in the same Sanskrit comparisons.
p("Matsya Purāṇa", "ch. 268, vv. 28–53", "I.130:27–35", "Corresponding temple descriptions; do not assume every verse is verbatim.")

# Non-Purāṇic textual parallels are kept distinct from Purāṇic ones.
p("Bṛhatsaṃhitā", "56.20–28", "I.130:27–35", "Identical temple-type passage also present in Matsya 268.28–53.")
p("Bṛhatsaṃhitā", "58.48, 47b, 50–52, 41–42", "I.132:26–32")
p("Bṛhatsaṃhitā", "60.14–19, 22a", "I.137:4–6a")

assert len({(s, n) for s, _, n in sections}) == 9
limits = {s: n for s, _, n in sections}
for r in records:
    assert 1 <= r["chapter"] <= limits[r["section"]], r
    assert r["passage"] and r["locus"] and r["work"], r
by_chapter = defaultdict(list)
for r in records:
    by_chapter[(r.pop("section"), r.pop("chapter"))].append({k: v for k, v in r.items() if v})
data = {
    "edition": edition,
    "sections": [{"id": s, "name": name, "chapters": n} for s, name, n in sections],
    "chapters": [{"section": s, "chapter": n, "evidence": ev} for (s,n),ev in sorted(by_chapter.items(), key=lambda pair: (list(limits).index(pair[0][0]),pair[0][1]))],
    "unplaced": [
        {"work": "Caturvargacintāmaṇi", "locus": "vol. II, vows for aṣṭamī and following tithis", "detail": "Verses attributed to Bhaviṣya have no secure position in the received Brāhma-parvan."},
        {"work": "Caturvargacintāmaṇi", "locus": "vol. III, śrāddha passages", "detail": "Additional attributed verses were reported without a chapter by chapter alignment."},
        {"work": "Dānasāgara", "locus": "fols. 14b, 23a, 276b, 287b–290a", "detail": "The quoted verses beginning bheryāṇi ca vādyāni and vimānam iti, and three lines beginning dhana-dhānyam, have no located match in the received text. Other passages are placed by chapter above, though their individual folios remain unresolved."},
        {"work": "Dānasāgara", "locus": "fol. 3b", "detail": "The Bhaviṣya is described through the saptamī-kalpa; the aṣṭamī and navamī sections of that witness are not present in this received form."},
    ],
}
out.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n")
print(f"{len(records)} links across {len(by_chapter)} chapters; {sum(n for _,_,n in sections)} tiles")
