---
layout: base.njk
title: "Blog"
---

# Entwicklungs-Dokumentation

Dieser Blog dokumentiert den Rebuild von antony.ch – transparent, iterativ, ehrlich.

---

{% for post in collections.posts %}
<article class="post-preview">
  <h2><a href="{{ post.url }}">{{ post.data.title }}</a></h2>
  
  <time datetime="{{ post.date | dateIso }}">
    {{ post.date | dateReadable }}
  </time>
  
  {% if post.data.description %}
  <p>{{ post.data.description }}</p>
  {% endif %}
</article>
{% endfor %}