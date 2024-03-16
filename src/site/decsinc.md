---
  title: decsinc
  summary: An unassuming webring for humans and non-humans who believe less is more
  template: decsinc
  data: ./public/static/decsinc.json
---

<img src="/static/img/decsinc/decsinc.png" alt="decsinc Logo" style="max-width:75%;">

[View Members](#rh-members)

**--O++** (aka **decsinc**) is an unassuming webring for humans and non-humans who believe **less is more**. It's for individuals expressing themselves in creative (or non-creative) ways, in opposition to or in favor of the corporate Internet, anyone that is open or shut, anything that is new or old. All are welcome and all are appreciated, minimalist sites are preferred but maximalist ones and the stuff vaguely in-between are free to join too.

It's designed to where you don't have to be limited by it. Just embed it somewhere visible in your site (preferably the index page) and you can display it in whatever way you want to as long as it keeps the `-- O ++` motif. Use the above "Branding Image" for reference, but you're not limited to just those four examples.

The logo sorta looks like a face so if you want to make a mascot from that you are more than welcome to.

## Joining

Joining the webring is a three-step process.

1. [Design your icon](#rh-design-your-icon).
2. [Shoot me an e-mail](#rh-shoot-me-an-e-mail).
3. [Embed it on your site](#rh-embed-it-on-your-site).

### Design your icon

The center of the `-- O ++` doesn't have to be a plain black square, it can also be used to identify your site. Your icon should be a 1-bit (one foreground and background color) square image in the size of either 5x5px or 10x10px.

<img src="/static/img/decsinc/icons.png" alt="Icon example" style="max-width:75%;">

It should be unique between websites (you can use the examples above as long as they haven't been used already), if it conflicts with another website's icon I'll let you know. Although, websites are listed according to their icon in the list at the bottom of this page, so eyeing it should be enough.

Once you're done convert it to binary. Start from the top left, and for every pixel of your icon put a 1 if it's the foreground color and a 0 for the background color, with a space for every new line. E.g. the left example image would be `01110 11101 11111 11111 01110`.

If you want an icon make sure you can actually display it. **Having an icon is strongly encouraged. I am willing to help you if you can't display it or don't know how.**

### Shoot me an e-mail

Now [email me](mailto:roxwize@proton.me) that you want your site added. You should give the the link to the page _that decsinc will be embedded on_, not just your site's index page. Remember to include the binary data for the icon you created (if you have one).

After awhile I'll add your site to the ring in a "standby" mode until you add the embed to your website, then I'll make it active and navigable. Email me when you add the embed so I know when to switch it over to the active mode.

### Embed it on your site

The way that you embed decsinc is up to you! The only guidelines are that there must be:

- a `--` on the left that leads to the previous page (https://roxwize.xyz/ext/decsinc/prev.html?id=[YOUR PAGE ID])
- your website's icon, or a blank square (can be outlined, filled, dotted, etc. as well as have rounded corners) inbetween the `--` and `++` _that leads to [this page](https://roxwize.xyz/site/decsinc.html)_. If you have an icon you need to display it here. It can be visualized in any way you see fit as long as it clearly matches the one on record (i.e. it's not hard to identify, so stuff like ASCII art or rounded corners is fine). If you don't have an icon then you can use anything you want in place of the symbol.
- a `++` on the right that leads to the next page (https://roxwize.xyz/ext/decsinc/next.html?id=[YOUR PAGE ID])

If you have any questions about embedding it, don't know how to, or anything of that sort, [email me](mailto:roxwize@proton.me) and I'll help you out in whatever way I can.

#### Embed examples

Here's a plaintext example that doesn't support displaying your icon:

```html
<a href="https://roxwize.xyz/ext/decsinc/prev.html?id=[YOUR PAGE ID]">--</a>
<a href="https://roxwize.xyz/site/decsinc.html">O</a>
<a href="https://roxwize.xyz/ext/decsinc/next.html?id=[YOUR PAGE ID]">++</a>
```

<div class="example">
  <a href="https://roxwize.xyz/ext/decsinc/prev.html?id=0">--</a>
  <a href="https://roxwize.xyz/site/decsinc.html">O</a>
  <a href="https://roxwize.xyz/ext/decsinc/next.html?id=0">++</a>
</div>

Here's an example with images that does support displaying your icon as long as you edit the center square's image to match it. If you're going to use this, please save the example images to your website and link to them instead.

```html
<style>
  .decsinc > a {
    display: inline-block;
    background-repeat: no-repeat;
    background-size: contain;
    height: 100%;
  }
  .decsinc > a:hover {
    filter: invert(1);
  }
</style>
<div class="decsinc">
  <a href="https://roxwize.xyz/ext/decsinc/prev.html?id=[YOUR PAGE ID]">
    <img src="/static/img/decsinc/dec.png" alt="previous" />
  </a>
  <a href="https://roxwize.xyz/site/decsinc.html">
    <img src="/static/img/decsinc/s.png" alt="decsinc" />
  </a>
  <a href="https://roxwize.xyz/ext/decsinc/next.html?id=[YOUR PAGE ID]">
    <img src="/static/img/decsinc/inc.png" alt="next" />
  </a>
</div>
```

<div class="example">
<style>
  .decsinc > a {
    display: inline-block;
    background-repeat: no-repeat;
    background-size: contain;
    height: 100%;
  }
  .decsinc > a:hover {
    filter: invert(1);
  }
</style>
<div class="decsinc">
  <a href="https://roxwize.xyz/ext/decsinc/prev.html?id=0" class="nu">
    <img src="/static/img/decsinc/dec.png" alt="previous">
  </a>
  <a href="https://roxwize.xyz/site/decsinc.html" class="nu">
    <img src="/static/img/decsinc/s.png" alt="decsinc">
  </a>
  <a href="https://roxwize.xyz/ext/decsinc/next.html?id=0" class="nu">
    <img src="/static/img/decsinc/inc.png" alt="next">
  </a>
</div>
</div>

## Members
