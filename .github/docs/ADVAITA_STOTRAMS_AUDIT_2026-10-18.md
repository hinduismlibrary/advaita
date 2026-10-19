# Advaita Stotrams and Hymns: progress log

Updated: 18 October 2026  
Scope: every text listed in the “Stotrams and Hymns” section of the Ādi Śaṅkarācārya library.

## Audit and implementation status

All ten listed readers were checked against their local JSON data and rendered HTML. Every numbered item has Devanāgarī Sanskrit, an English reading, a word-for-word gloss with Sanskrit and English fields, and Devanāgarī from which IAST transliteration is available. The JSON unit count matches the expected unit count for all ten works. Colophons are included where present but are not counted as hymn verses.

The reader now shows only two study controls per verse: **Transliteration** and **Word for Word**. Word-for-word rows display the Sanskrit in Devanāgarī, its IAST in parentheses, then an English gloss on the same compact line. The button row and open transliteration panel use reduced spacing.

Bhajagovindam already had a contents navigation; it now has topic summaries for verses 1–10, 11–20, 21–30, and the closing verse 31. The index’s hymn counts were corrected to match its displayed Sanskrit: Viṣṇu Ṣaṭpadī has seven numbered stanzas, and the Dakṣiṇāmūrtyaṣṭakam reader has ten numbered verses in the local recension.

## Per-text log

| Text | Verse count on index | Data units checked | Sanskrit | English | IAST | Word for word | Status |
|---|---:|---:|---|---|---|---|---|
| Advaitapañcaratnam | 5 | 5 + colophon | 5/5 | 5/5 | 5/5 | 5/5 | Complete |
| Kāśīpañcakam | 5 | 5 + colophon | 5/5 | 5/5 | 5/5 | 5/5 | Complete |
| Manīṣāpañcakam | 5 | 5 + colophon | 5/5 | 5/5 | 5/5 | 5/5 | Complete |
| Māyāpañcakam | 5 | 5 + colophon | 5/5 | 5/5 | 5/5 | 5/5 | Complete |
| Yatipañcakam | 5 | 5 + colophon | 5/5 | 5/5 | 5/5 | 5/5 | Complete |
| Nirvāṇaṣaṭkam | 6 | 6 + colophon | 6/6 | 6/6 | 6/6 | 6/6 | Complete |
| Viṣṇu Ṣaṭpadī Stotram | 7 | 7 + colophon | 7/7 | 7/7 | 7/7 | 7/7 | Complete |
| Śrī Dakṣiṇāmūrtyaṣṭakam | 10 | 10 + colophon | 10/10 | 10/10 | 10/10 | 10/10 | Complete |
| Hastāmalaka-stotram | 12 | 12 | 12/12 | 12/12 | 12/12 | 12/12 | Complete |
| Bhajagovindam (Mohamudgara) | 31 | 31 | 31/31 | 31/31 | 31/31 | 31/31 | Complete; contents topic notes added |

The short hymns also retain direct verse-anchor navigation; the separate contents-page threshold does not apply to these under-20-verse texts. Bhajagovindam is over that threshold and has grouped contents with topic notes.

## Text witnesses checked

These pages were used to compare the Sanskrit sequence and numbered stanzas. The repository’s selected readings and English translations remain on the site; differing recensions are not silently replaced.

- [Advaitapañcaratnam](https://sanskritdocuments.org/doc_z_misc_shankara/advaita5.html)
- [Kāśīpañcakam](https://sanskritdocuments.org/doc_z_misc_shankara/kashipanchakam.html)
- [Manīṣāpañcakam](https://sanskritdocuments.org/doc_z_misc_shankara/manishhaa5.html)
- [Māyāpañcakam](https://sanskritdocuments.org/doc_z_misc_shankara/mAyA5.html)
- [Yatipañcakam / Kaupīna-pañcakam](https://sanskritdocuments.org/doc_z_misc_shankara/kaupiina5.html)
- [Nirvāṇaṣaṭkam](https://sanskritdocuments.org/doc_z_misc_shankara/aatmasha.html)
- [Viṣṇu Ṣaṭpadī](https://sanskritdocuments.org/doc_vishhnu/vishnu6padi.html)
- [Dakṣiṇāmūrti stotra](https://sanskritdocuments.org/doc_shiva/dakshina.html)
- [Hastāmalakīyam (the selected twelve-verse text)](https://bhagavatpadiyam.sringeri.net/en/work/hastamalakiyam)
- [SanskritDocuments alternate transcription, which includes an opening question and reply](https://sanskritdocuments.org/doc_yoga/hastaam.html)
- [Bhajagovindam](https://sanskritdocuments.org/doc_vishhnu/bhajagovindam.html)


## Final literal-gloss pass

Bhajagovindam and Māyāpañcakam corrections were applied to both the JSON data and the embedded static verse cards so the displayed page and its data source agree. The other eight readers retain the previously checked matching verse cards and data. The short works retain no separate contents page; Bhajagovindam retains its grouped verse-range contents.

Corrected clear lexical issues in Bhajagovindam: verse 1 now maps repeated words separately and distinguishes “arrived,” “near,” and “at the time”; verse 4 describes life as “fickle, fleeting”; verse 14 correctly glosses plucked hair; verse 20 aligns the Gītā, Gaṅgā-water, worship, and Yama words; verse 26 maps “having given up” to त्यक्त्वा and “the Self” to आत्मानम्; verse 27 gives अजस्रम् as “constantly” and नामसहस्रम् as “the thousand names”; verse 29 correctly identifies the wealthy; verse 30 uses “discrimination” and “mantra recitation”; verse 31 separates restraint of the senses and mind from “in this way.” Corrected the Māyāpañcakam refrain by separating तु (“indeed”) where it combines with the following अघटित in verses 1, 3, and 4. Verses 2 and 5 have no तु particle there, so their word maps now begin with अघटित-घटना-पटीयसी. The matching English refrain gloss is “skilled at making the impossible happen.” Bhajagovindam verses 5, 6, 24, and 28 also now split sandhi where needed and use translations that follow the Sanskrit more closely.

The selected Hastāmalakīyam text follows the Sringeri twelve-verse edition. SanskritDocuments prints two opening dialogue verses before the twelve teaching verses; those introductory verses are not counted in this selected edition. The audit’s verse-field checks verify coverage and rendered controls; they do not claim a peer-reviewed critical translation.


## Follow-up: user-reported missing-gloss notice

Source re-check started 2026-10-18 21:08:29 UTC and completed 2026-10-18 21:08:58 UTC. The exact notice is generated by the shared reader when it cannot find a gloss row. A source-level pass of the current ten hymn pages found gloss rows on all 99 verse and colophon cards (91 numbered verses and 8 colophons). The public page could not be opened by this workspace's browser, so the displayed notice could not be reproduced directly here.

The shared reader now searches nested controls and word lists, recovers rows when the list wrapper is absent, and rebuilds incomplete previously marked controls. Its coverage note reports all entries only when every card has a gloss. All ten hymn pages now request the updated JavaScript and CSS assets with cache key `stotra-controls-20261018b`. The compact control and transliteration spacing has also been reduced.

| Text | Entries with gloss rows | Follow-up |
|---|---:|---|
| Advaitapañcaratnam | 6/6 | Checked |
| Kāśīpañcakam | 6/6 | Checked |
| Manīṣāpañcakam | 6/6 | Checked |
| Māyāpañcakam | 6/6 | Refrain boundaries and English alignment corrected in data and static reader |
| Yatipañcakam | 6/6 | Checked |
| Nirvāṇaṣaṭkam | 7/7 | Verse 6 wording and gloss aligned |
| Viṣṇu Ṣaṭpadī Stotram | 8/8 | Verse 4 compound and repeated word corrected |
| Śrī Dakṣiṇāmūrtyaṣṭakam | 11/11 | Checked |
| Hastāmalaka-stotram | 12/12 | Checked |
| Bhajagovindam (Mohamudgara) | 31/31 | Checked |

The message condition is therefore not evidence of absent glosses in these current source cards. The reader fix and cache refresh are intended to make the published controls use the glosses already present.


### Follow-up translation and gloss alignment pass

Completed 2026-10-18 21:14:27 UTC. The verse 4 compound in Viṣṇu Ṣaṭpadī was aligned as “sun • moon • eyed,” and its second दृष्टे is separately glossed as “when seen.” The English translation now follows that reading instead of calling the Lord “friend of all.” Nirvāṇaṣaṭkam verse 6 now says “through all the senses” for सर्वेन्द्रियाणाम् and preserves the negation in न चासङ्गतं (“not the state of being unattached”) and keeps “not even” with नैव मुक्तिः. Both changes are in the JSON data and embedded reader cards.

Completed 2026-10-18 21:17:07 UTC. Kāśīpañcakam verse 1 was aligned in both the English translation and the Devanāgarī-backed gloss: विमलादिगङ्गा is read as विमला + आदिगङ्गा, “pure, primordial Ganges.”
