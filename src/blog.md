---
layout: base.njk
title: "Blog"
description: "Notizen über Sprache, Musik, AI und den Prozess dazwischen."
---

# Blog

Notizen über Sprache, Musik, AI und den Prozess dazwischen.

---

{% for post in collections.posts %}
{% if not post.data.draft %}
<article class="post-preview">
  <h2><a href="{{ post.url }}">{{ post.data.title }}</a></h2>
  
  <time datetime="{{ post.date | dateIso }}">
    {{ post.date | dateReadable }}
  </time>
  
  {% if post.data.description %}
  <p>{{ post.data.description }}</p>
  {% endif %}
</article>
{% endif %}
{% endfor %}
