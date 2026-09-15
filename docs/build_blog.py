#!/usr/bin/env python3
"""Generate blog.html + 6 blog-*.html posts for the Humsafar site (run from repo root)."""
import html, sys, os

CSSV = sys.argv[1]
JSV = sys.argv[2]
FONTS = '<link href="https://fonts.googleapis.com/css2?family=Allison&family=Cinzel:wght@500;600&family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=EB+Garamond:ital,wght@0,400..800;1,400..800&family=Jost:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">'
BRAND = "Humsafar Weddings By GnK Events"

POSTS = [
  dict(
    slug="blog-micro-weddings.html", trending=True,
    cat="Trends", date="15 September 2026", read="6 min read",
    title="Micro-weddings are the new grand wedding",
    dek="Why more couples are cutting the guest list, not the celebration, and how to make a smaller wedding feel bigger than ever.",
    img="images/gallery/web/ADA08746.jpg", w=1800, h=1200,
    alt="Family exchanging blessings under hanging flowers at an intimate celebration",
    body="""
<p class="blog-lede">For years the measure of an Indian wedding was its headcount. In 2026 the question couples ask us first has changed. It is no longer <em>how many can we invite</em>, but <em>who do we really want in the room</em>.</p>

<p>Micro-weddings, celebrations for roughly thirty to eighty guests, have become one of the clearest shifts in how families plan. The budget does not always shrink. It simply moves: away from feeding a crowd and towards the experience of every person who is there.</p>

<h2>Why couples are choosing smaller</h2>
<ul>
  <li><strong>Every guest matters.</strong> With a shorter list, you actually spend time with the people you invited instead of greeting a receiving line for three hours.</li>
  <li><strong>Better hospitality per head.</strong> The same spend can cover a chef-curated menu, better rooms and thoughtful welcome hampers.</li>
  <li><strong>Venues open up.</strong> Boutique resorts, heritage havelis and private lawns that could never hold a thousand guests become possible.</li>
  <li><strong>Less stress.</strong> Fewer moving parts means calmer families and a timeline that leaves room to breathe.</li>
</ul>

<h2>Where the budget goes instead</h2>
<p>When the numbers come down, the details come up. The most memorable small weddings we plan put their money into three places:</p>
<ol>
  <li><strong>Food as an event.</strong> Live counters, a regional thali for the haldi lunch, a late-night chaat cart after the sangeet.</li>
  <li><strong>Décor you can walk up to.</strong> At an intimate scale guests see every flower up close, so fresh florals and hand-finished details matter more than scale.</li>
  <li><strong>Guest experience.</strong> Named seating, personal notes in rooms and a planned morning activity turn guests into participants.</li>
</ol>

<blockquote>A small wedding is not a smaller version of a big one. It is a different kind of celebration, and it should be designed that way.</blockquote>

<h2>How to keep the guest list honest</h2>
<p>The hardest part of a micro-wedding is not the planning. It is the conversation at home. A few rules make it easier:</p>
<ul>
  <li>Agree on the final number <em>before</em> anyone starts naming people.</li>
  <li>Split the list into equal shares for both families and the couple.</li>
  <li>Plan a relaxed reception or dinner later for the wider circle, if it helps keep the peace.</li>
</ul>

<h2>Does every ritual still fit?</h2>
<p>Yes. Haldi, mehndi, sangeet, pheras and vidaai all work beautifully at a smaller scale, and often feel more personal. What changes is pacing: functions can sit closer together, and the family can take part in everything instead of watching from the edge.</p>

<p>If you are weighing a smaller celebration, start with the people, then choose the place, then design the days around them. The rest follows.</p>
"""),
  dict(
    slug="blog-jim-corbett-destination-wedding.html", trending=True,
    cat="Destinations", date="12 September 2026", read="7 min read",
    title="Planning a destination wedding in Jim Corbett",
    dek="Forest mornings, river light and resorts built for a crowd: a practical guide to marrying in the foothills.",
    img="images/outdoor-dining-web.jpg", w=2400, h=1600,
    alt="An outdoor dining space with hanging décor, fresh flowers and lanterns",
    body="""
<p class="blog-lede">Jim Corbett has quietly become one of North India's favourite wedding destinations. It is close enough to Delhi for families to drive, far enough to feel like an escape, and green in a way no city banquet hall can match.</p>

<p>We run a studio in Peerumadara, Ramnagar, so Corbett is home ground for our team. Here is what we tell every couple who asks whether it is right for them.</p>

<h2>Why Corbett works for weddings</h2>
<ul>
  <li><strong>Easy to reach.</strong> Most guests can drive in from Delhi NCR in a single day, with Ramnagar the nearest railway station.</li>
  <li><strong>Resorts sized for families.</strong> Many properties along the Kosi river can host an entire wedding party across rooms, lawns and banquet spaces.</li>
  <li><strong>Natural décor.</strong> Old trees, riverbanks and open lawns give you a backdrop before a single flower goes up.</li>
  <li><strong>A real getaway.</strong> Guests can add a jungle safari or a river walk, which turns a wedding into a short holiday.</li>
</ul>

<h2>When to marry in the foothills</h2>
<p>The cooler months from October to March are the most comfortable for outdoor functions, with crisp mornings that suit a haldi on the lawn and evenings that call for bonfires. Summer weddings are possible with shaded, evening-heavy timelines. During the monsoon, plan indoor or covered back-ups for every outdoor function.</p>

<blockquote>In the forest, the light does half the decorating. Our job is to plan every function around it.</blockquote>

<h2>Designing a forest wedding</h2>
<ol>
  <li><strong>Work with the setting.</strong> Greens, whites, marigold and natural wood look right under the trees; heavy mirrored sets can feel out of place.</li>
  <li><strong>Time functions to the light.</strong> A mid-morning haldi, a golden-hour varmala and an evening sangeet under strung lights.</li>
  <li><strong>Plan for the outdoors.</strong> Weather cover, lighting for pathways and warm layers or heaters for winter nights.</li>
  <li><strong>Respect the forest.</strong> Keep sound levels and late-night fireworks within local rules, and choose décor that leaves no waste behind.</li>
</ol>

<h2>Guest logistics to settle early</h2>
<ul>
  <li>Book rooms well ahead for peak winter dates.</li>
  <li>Arrange group transfers from Delhi or from Ramnagar station.</li>
  <li>Share a simple guest guide: weather, dress notes, timings and a map.</li>
  <li>Keep a help desk at the resort so families always know who to ask.</li>
</ul>

<p>A Corbett wedding asks for a little more planning than a city one, and gives back a great deal more. If the idea of pheras beneath the trees appeals to you, it is well worth exploring.</p>
"""),
  dict(
    slug="blog-pastel-decor-trends.html", trending=True,
    cat="Décor", date="9 September 2026", read="5 min read",
    title="Soft pastels and painterly palettes: the décor shift of 2026",
    dek="Blush, ivory, sage and champagne are replacing wall-to-wall red. Here is how to use them without losing the festive warmth.",
    img="images/gallery/web/ADA09093.jpg", w=1200, h=1800,
    alt="A draped pink ceiling above a decorated aisle",
    body="""
<p class="blog-lede">Walk into a wedding this season and you are as likely to see blush drapes and ivory florals as marigold and red. Pastel palettes, soft, painterly and layered, have moved from the bridal lehenga into the whole wedding.</p>

<h2>The palettes we are designing most</h2>
<ul>
  <li><strong>Blush and gold.</strong> Romantic and warm; lovely for receptions and mandaps under chandeliers.</li>
  <li><strong>Ivory, champagne and sage.</strong> Calm and elegant, and made for daytime pheras and garden lunches.</li>
  <li><strong>Lilac and powder blue.</strong> A fresh choice for mehndi and cocktail evenings.</li>
  <li><strong>Peach and coral.</strong> The pastel that still feels festive, and it sits happily beside marigold.</li>
</ul>

<h2>Keeping pastels festive</h2>
<p>The risk with a soft palette is that it can look washed out, especially in photographs and under night lighting. Three things stop that from happening:</p>
<ol>
  <li><strong>Layer tones, do not flatten them.</strong> Mix three or four shades of the same family rather than one colour everywhere.</li>
  <li><strong>Add texture.</strong> Pleated drapes, dense florals, crystal and brass give pastels depth.</li>
  <li><strong>Light it warmly.</strong> Warm white lighting keeps blush and ivory glowing instead of grey.</li>
</ol>

<blockquote>Pastel does not mean quiet. It means every shade has been chosen on purpose.</blockquote>

<h2>A different palette for every function</h2>
<p>You do not need one colour story for the whole wedding. Many couples now give each function its own mood: sunny yellows for haldi, greens and pinks for mehndi, jewel tones for the sangeet and a soft pastel reception to close. This gives guests a sense of moving through the celebration, and your photographs a clear rhythm.</p>

<h2>Where tradition stays</h2>
<p>A pastel wedding can still honour red and gold where they matter. The bridal outfit, the mandap canopy or the vidaai can hold the traditional colours while the rest of the décor stays soft. The contrast often makes those moments stand out even more.</p>
"""),
  dict(
    slug="blog-new-sangeet.html", trending=False,
    cat="Entertainment", date="5 September 2026", read="6 min read",
    title="The new sangeet: family performances, live acts and a night to remember",
    dek="The sangeet has become the heart of the wedding week. Here is how to plan one that everyone, from grandparents to cousins, remembers.",
    img="images/gallery/web/ADA08857.jpg", w=1800, h=1200,
    alt="Dancers performing in teal silk before a stage",
    body="""
<p class="blog-lede">Ask any family which function they are most excited about and the answer is usually the sangeet. It has grown from an evening of songs at home into a full production, with choreographed family performances, live music and a dance floor that stays full until late.</p>

<h2>Family performances are the headline</h2>
<p>However big the artist on the bill, the moment everyone films is the grandparents' dance or the cousins' surprise act. Families are putting real effort into these performances, and it shows.</p>
<ul>
  <li><strong>Start early.</strong> Four to six weeks of relaxed rehearsals is far kinder than three frantic evenings.</li>
  <li><strong>Keep it short.</strong> Two to four minutes per act holds attention; a dozen long acts will not.</li>
  <li><strong>Mix the generations.</strong> A song that brings parents, children and grandparents on stage together always lands.</li>
  <li><strong>Tell your story.</strong> Songs chosen for how the couple met, or for each family's roots, make it personal.</li>
</ul>

<h2>Live acts and the right mix</h2>
<p>A live singer, a dhol ensemble or a band gives the evening energy that a playlist cannot. The best nights balance three things: family performances early, a live act as the peak, and a DJ to carry the dance floor afterwards.</p>

<blockquote>Plan the sangeet like a show, but remember the audience is family. Warmth beats spectacle every time.</blockquote>

<h2>A running order that works</h2>
<ol>
  <li>Welcome, dinner opens and a short introduction from the hosts.</li>
  <li>Family performances, grouped so there is no long wait between acts.</li>
  <li>The couple's performance to close the family segment.</li>
  <li>The live act, as the high point of the night.</li>
  <li>An open dance floor with the DJ.</li>
</ol>

<h2>Small details that make a big difference</h2>
<ul>
  <li>A choreographer who can adapt steps for every age and ability.</li>
  <li>A proper sound check and stage rehearsal on the day.</li>
  <li>A stage manager who keeps performers ready and on time.</li>
  <li>Seating with a clear view for elders, close to the front.</li>
</ul>

<p>Because our planning and entertainment teams sit in the same house, the choreography, sound, lighting and running order are designed together. That is what lets a sangeet feel effortless on the night.</p>
"""),
  dict(
    slug="blog-sustainable-shaadi.html", trending=False,
    cat="Planning", date="1 September 2026", read="5 min read",
    title="The sustainable shaadi: celebrating beautifully with less waste",
    dek="Fresh flowers, local sourcing and smarter décor choices: simple ways to make a big Indian wedding kinder to the planet.",
    img="images/gallery/web/ADA08612.jpg", w=1800, h=1200,
    alt="Whimsical floral mehndi décor with a swing and flamingo accents",
    body="""
<p class="blog-lede">Indian weddings are generous by nature: more food, more flowers, more of everything. More couples now want that generosity without the waste that often follows, and the good news is that it rarely means giving anything up.</p>

<h2>Flowers: fresh, local and given a second life</h2>
<ul>
  <li><strong>Choose seasonal blooms.</strong> Marigold, rajnigandha, roses and local greens are fresher and travel less.</li>
  <li><strong>Avoid floral foam where possible.</strong> Use water tubes, moss or reusable frames instead.</li>
  <li><strong>Reuse across functions.</strong> Mandap florals can be redesigned for the reception, and aisle arrangements can become table pieces.</li>
  <li><strong>Plan what happens afterwards.</strong> Petals can be dried for keepsakes or composted rather than thrown away.</li>
</ul>

<h2>Décor that is built to be used again</h2>
<p>Much of the waste at a wedding comes from sets built for a single night. Reusable structures, fabric drapes, wooden and brass elements, and rented furniture look every bit as good and keep materials out of landfill.</p>

<blockquote>The most sustainable décor is the piece that is used again next season, not the one that is built and broken in a day.</blockquote>

<h2>Food: plan it, do not over-plan it</h2>
<ol>
  <li><strong>Confirm numbers late and accurately.</strong> RSVPs and a final headcount help caterers cook the right amount.</li>
  <li><strong>Favour live counters.</strong> Food made to order wastes far less than trays left out for hours.</li>
  <li><strong>Arrange food donation in advance.</strong> Partner with a local organisation that can collect surplus safely.</li>
</ol>

<h2>Smaller swaps that add up</h2>
<ul>
  <li>Digital or seed-paper invitations.</li>
  <li>Steel or glass drinkware instead of plastic.</li>
  <li>Return gifts from local artisans.</li>
  <li>Grouped guest transport rather than dozens of separate cars.</li>
</ul>

<p>You do not have to do everything on this list. Pick the changes that matter most to your family, and let your planner build them into the brief from the start, when they are easiest to deliver.</p>
"""),
  dict(
    slug="blog-personal-wedding-details.html", trending=False,
    cat="Ideas", date="28 August 2026", read="5 min read",
    title="Make it yours: personal touches couples love right now",
    dek="Custom vows, meaningful entries and family stories woven into the day: the details that turn a wedding into your wedding.",
    img="images/gallery/web/ADA01423.jpg", w=1800, h=1200,
    alt="Bridesmaids holding hand-painted vow placards",
    body="""
<p class="blog-lede">The weddings people talk about for years are rarely the most expensive. They are the most personal: the ones where every guest could tell, from the first moment, whose celebration it was.</p>

<h2>Words that are your own</h2>
<ul>
  <li><strong>Personal vows.</strong> A few lines spoken to each other, alongside the traditional ceremony, are unforgettable.</li>
  <li><strong>Letters from family.</strong> Parents or grandparents reading a short note at the sangeet or reception.</li>
  <li><strong>Signs and placards.</strong> Hand-painted messages carried by friends make for joyful moments and photographs.</li>
</ul>

<h2>Entries with meaning</h2>
<p>The baraat and the bride's entry are natural stages for storytelling. Some of our favourite ideas are simple: walking in to a song from your first date, entering with siblings or cousins, or arriving under a phoolon ki chadar held by the people who raised you.</p>

<blockquote>The best personal touches are not added at the end. They are planned into the day from the very first meeting.</blockquote>

<h2>Weave in your families' roots</h2>
<ol>
  <li><strong>Food from home.</strong> A dish from each side of the family on the menu, with a small card telling its story.</li>
  <li><strong>Regional rituals.</strong> Customs from both families, explained to guests so everyone can take part.</li>
  <li><strong>Heirlooms.</strong> A grandmother's jewellery, a father's safa or a family photograph wall near the entrance.</li>
</ol>

<h2>Keepsakes guests actually keep</h2>
<ul>
  <li>Handwritten notes left in guest rooms.</li>
  <li>A live illustrator sketching guests at the reception.</li>
  <li>A photo booth with props that reflect your story.</li>
  <li>Return gifts chosen for each family, not ordered in bulk.</li>
</ul>

<p>Start by telling your planner the stories that matter to you: how you met, what your families love, the songs that mean something. Those stories are where the most personal details come from.</p>
"""),
]

def esc(s): return html.escape(s, quote=True)

def head(title, desc):
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{esc(title)}</title>
  <meta name="description" content="{esc(desc)}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  {FONTS}
  <link rel="stylesheet" href="css/style.css?v={CSSV}">
  <link rel="icon" href="images/hw-logo.png">
</head>
<body data-page="blog" data-nav="solid">
"""

FOOT = f"""
  <script src="js/main.js?v={JSV}"></script>
</body>
</html>
"""

def card(p, cls="blog-card"):
    badge = '<span class="blog-card__badge">Trending</span>' if p["trending"] else ""
    return f"""        <article class="{cls}" data-reveal>
          <a class="blog-card__img" href="{p['slug']}">{badge}<img width="{p['w']}" height="{p['h']}" src="{p['img']}" alt="{esc(p['alt'])}" loading="lazy" decoding="async"></a>
          <div class="blog-card__body">
            <h3 class="blog-card__title"><a href="{p['slug']}">{esc(p['title'])}</a></h3>
            <p class="blog-card__dek">{esc(p['dek'])}</p>
            <a class="blog-card__more" href="{p['slug']}">Read the story</a>
          </div>
        </article>
"""

# ---------- index ----------
feat = POSTS[0]
trending = [p for p in POSTS if p["trending"] and p is not feat]
rest = [p for p in POSTS if not p["trending"]]
idx = head(f"Blog — {BRAND}", "Wedding trends, destination guides and planning ideas from the Humsafar Weddings By GnK Events team in Delhi NCR and Jim Corbett.")
idx += f"""
  <!-- ============ HERO (same curved-hem pattern as the inner pages) ============ -->
  <section class="chero">
    <div class="chero__photo">
      <img src="images/gallery/web/ADA00534.jpg" alt="The couple dancing with guests beneath a glowing floral ceiling">
      <div class="chero__scrim"></div>
      <div class="chero__crumb" data-reveal><a href="index.html">Home</a><span>✦</span>Blog</div>
    </div>
    <h1 class="chero__title" data-reveal>Blog</h1>
    <p class="chero__sub" data-reveal style="--rd:150ms">Trends, destinations and ideas from the people who plan them. <em>Notes from the wedding week.</em></p>
  </section>

  <main class="blog">
    <div class="container">

      <!-- ===== Trending: featured story ===== -->
      <section class="blog-section" aria-labelledby="blog-trending">
        <pre class="rr-pre blog-eyebrow" id="blog-trending"><code>Trending now</code></pre>
        <article class="blog-feature" data-reveal>
          <a class="blog-feature__img" href="{feat['slug']}"><span class="blog-card__badge">Trending</span><img width="{feat['w']}" height="{feat['h']}" src="{feat['img']}" alt="{esc(feat['alt'])}" decoding="async"></a>
          <div class="blog-feature__body">
            <h2 class="blog-feature__title"><a href="{feat['slug']}">{esc(feat['title'])}</a></h2>
            <p class="blog-feature__dek">{esc(feat['dek'])}</p>
            <a class="blog-card__more" href="{feat['slug']}">Read the story</a>
          </div>
        </article>
        <div class="blog-grid blog-grid--2">
{''.join(card(p) for p in trending)}        </div>
      </section>

      <!-- ===== Latest ===== -->
      <section class="blog-section" aria-labelledby="blog-latest">
        <pre class="rr-pre blog-eyebrow" id="blog-latest"><code>More from the blog</code></pre>
        <div class="blog-grid">
{''.join(card(p) for p in rest)}        </div>
      </section>

      <div class="blog-cta" data-reveal>
        <h2 class="blog-cta__title">Planning your own celebration?</h2>
        <p class="blog-cta__line">Tell us about the wedding you have in mind, and we will help you shape every day of it.</p>
        <pre class="rr-pre blog-cta__link"><code><a href="contact.html">Let’s plan your safar</a></code></pre>
      </div>

    </div>
  </main>
"""
idx += FOOT
open("blog.html", "w").write(idx)

# ---------- posts ----------
for i, p in enumerate(POSTS):
    more = [POSTS[(i + k) % len(POSTS)] for k in (1, 2, 3)]
    out = head(f"{p['title']} — {BRAND} Blog", p["dek"])
    out += f"""
  <main class="blog-post">
    <header class="post-head container">
      <h1 class="post-title">{esc(p['title'])}</h1>
      <p class="post-dek">{esc(p['dek'])}</p>
    </header>

    <figure class="post-cover container">
      <img width="{p['w']}" height="{p['h']}" src="{p['img']}" alt="{esc(p['alt'])}" decoding="async">
    </figure>

    <article class="post-body container">
{p['body']}
      <div class="post-cta">
        <p class="post-cta__title">Planning something like this?</p>
        <p class="post-cta__line">Our team plans, designs and entertains in-house across Delhi NCR and Jim Corbett.</p>
        <pre class="rr-pre post-cta__link"><code><a href="contact.html">Talk to our planners</a></code></pre>
      </div>
      <p class="post-back"><a href="blog.html">← Back to all stories</a></p>
    </article>

    <section class="post-more container" aria-labelledby="post-more-h">
      <pre class="rr-pre blog-eyebrow" id="post-more-h"><code>Keep reading</code></pre>
      <div class="blog-grid">
{''.join(card(m) for m in more)}      </div>
    </section>
  </main>
"""
    out += FOOT
    open(p["slug"], "w").write(out)
print("wrote blog.html +", len(POSTS), "posts")
