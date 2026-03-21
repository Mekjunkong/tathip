# TaThip Knowledge Sources — Deep Research Report

**Date:** 2026-03-22
**Confidence:** HIGH (0.85) | 50+ sources identified

---

## Priority 1 — Ingest First (~100K+ tokens)

### Planet-in-House Interpretations
| Source | URL | Tokens |
|--------|-----|--------|
| Palachote.com (Parts 5-6) | palachote.com/content/content5.html, content6.html | ~15K |
| Baankhunyai.com (Houses+Planets) | baankhunyai.com/16046120/, /16046130/, /16053042/, /17177805/ | ~30K |

### Planetary Pair Meanings (ดาวคู่)
| Source | URL | Tokens |
|--------|-----|--------|
| Wanghora WordPress | wanghora.wordpress.com/2-เกร็ดดาวคู่/ | ~10K |
| Sinsaehwang.com | sinsaehwang.com/สรุปความหมายคู่เลขมิตร/ | ~6K |

### Thai Numerology (เลขศาสตร์)
| Source | URL | Tokens |
|--------|-----|--------|
| Sinsae.com — Consonant-Number Table | sinsae.com/เลขศาสตร์/ | ~5K |
| Number Meanings 1-100 | central.co.th, thairath.co.th/horoscope/belief/2835688 | ~15K |
| Phone/License Plate Analysis | fengshuix.com, tqm.co.th, myhora.com | ~8K each |
| ทักษา Name System | thaibabyname.com, theluckyname.com, myhora.com | ~12K |

### 27 Nakshatras (นักษัตร)
| Source | URL | Tokens |
|--------|-----|--------|
| Navatara System (27 stars) | mariamgoodstudy.blogspot.com/2021/03/27.html | ~8K |

### Thai Consonant-to-Number Complete Table
```
1: ก ด ท ถ ภ ฤ
2: ข ช บ ป ง
3: ฆ ฑ ฒ ต ฃ
4: ค ธ ร ญ ษ
5: ฉ ณ ฌ น ม ห ฮ ฎ ฬ
6: จ ล ว อ
7: ศ ส ซ
8: ย พ ฟ ผ ฝ
9: ฏ ฐ
```

---

## Priority 2 — Ingest Soon

### Calculation Methodology
| Source | URL | Tokens |
|--------|-----|--------|
| Wikipedia Thai — Suriyayatra | th.wikipedia.org/wiki/สุริยยาตร | ~8K |
| Myhora.com Help | myhora.com/astrology/thai/help.aspx | ~5K |

### Auspicious Timing (ฤกษ์)
| Source | URL | Tokens |
|--------|-----|--------|
| 9 ฤกษ์ Categories | horoscope.trueid.net/detail/28bQgvRvML5q | ~5K |
| วันธงชัย/อธิบดี 2569 | ennxo.com/article/thai-auspicious-days-2026 | ~6K |

### FREE Books (Archive.org)
| Title | URL | Size |
|-------|-----|------|
| ตำราพรหมชาติ (อ.เทพย์) | archive.org/details/proommachat | 480MB |
| โหราศาสตร์ในวรรณคดี (1959) | archive.org/details/unset0000unse_s3a3 | Public domain |

### Academic Paper
| Title | URL |
|-------|-----|
| Concepts of Planets in Thai vs Vedic Texts | researchgate.net/publication/326477160 |

### Website Content (Large Volume)
| Source | Est. Tokens |
|--------|-------------|
| Payakorn.com articles | 50K+ |
| Myhora.com methodology | 100K+ |
| Tarotthailand.com tutorials | ~20K |
| Astroneemo.net articles | ~15K |

---

## Priority 3 — Ingest Later

### Tarot (Thai Context)
- shitsuren-tarot.com — All 78 cards in Thai (~40K tokens)
- duanglive.com/tarot_meaning.php
- Royal Thai Tarot Deck (tarot.com/tarot/decks/royal-thai)

### Chinese Astrology
- fengshuix.com BaZi calculator + 14 prophecy stars
- fengshuimee.com Four Pillars

### Academic Theses
- MCU e-thesis: Astrology principles in Thai society
- MCU: Thai astrology & Buddhist scriptures
- Cleveland State: Thai woman & traditional astrology practice

---

## Books to Purchase (Recommended Order)

1. **โหราศาสตร์เบื้องต้น** (อ.เทพย์ สาริกบุตร) — ~300-500 THB, mahamongkol.com
2. **เคล็บลับมหาทักษา** (อ.สำราญ) — ~200-300 THB
3. **Astrology Thai Logical Style** — ~$10, MEB Market (English available)
4. **Know Your Future: Thai Astrology Step by Step** — ~$15, Amazon/B&N

### Book Shopping Platforms
- MEB Market: mebmarket.com (largest Thai e-book)
- Mahamongkol.com (specialist, complete อ.เทพย์ collection)
- Kinokuniya Thailand
- Lazada

---

## Key Gaps Identified

1. **วันธงชัย/วันอธิบดี formulas** — Not publicly documented, teacher-lineage knowledge
2. **Complete 9x12 planet-house matrix** — Must compile from multiple sources
3. **Thai-specific differences from Vedic** — Best source is the ResearchGate paper
4. **Horasaadrevision.com** — Rich content but encoding issues in scraping

---

## Ingestion Action Plan

### Phase A: Scrape Priority 1 websites (immediate)
Create new ingestion scripts for: palachote.com, baankhunyai.com, wanghora.wordpress.com, sinsae.com, mariamgoodstudy.blogspot.com

### Phase B: Download free books (next)
Download from Archive.org: ตำราพรหมชาติ, โหราศาสตร์ในวรรณคดี

### Phase C: Scrape large sites (ongoing)
Payakorn.com, Myhora.com methodology pages, Astroneemo.net

### Phase D: Purchase and ingest books
Buy top 2-3 books, OCR/extract, chunk and embed
