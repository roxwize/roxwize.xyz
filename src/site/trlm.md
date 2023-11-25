---
  title: The roxwize link mechanism
  summary: Hyperlink ads for your website!
  showheader: false
---
# [The roxwize link mechanism](https://roxwize.xyz/ext/trlm/)

Okay. Listen. It's a mad world out there. I can't even fathom the amount of ww3 domain parking content farm websites there are out there. But they exist. And I don't trust them. You shouldn't either. But if there's anything more trustworthy than scummy advertising it's me. You can trust me, right? So what if I... took those guys' ideas... and made it, like, actually good? You can trust me. Honest. In fact, I'll even let you add your *own* links to it. For free! If you're still not convinced, the door is <a href="javascript:window.history.back()">that way</a>.

**Basically, it's hypertext BannerLink Ads**. You can embed it on your website as an &lt;iframe&gt; and tailor the links themselves to a specific category.

Linked below are the instructions for embedding TRLM and adding your website to it. If something doesn't make sense to you or confuses you, please notify me via [e-mail](mailto:biscordbro@gmail.com) or [Neocities](https://neocities.org/site/hoylecake/) and I'll try to address the issue.

[Embed](#rh-to-add-trlm-to-your-website) | [Add your website](#rh-to-add-your-website-to-trlm)

## To add TRLM to your website

If you're feeling generous you can display other people's websites on yours. By default, up to eight links are displayed at once. Here is the link to the frame for you to embed:

`https://roxwize.xyz/ext/trlm/?category=[CATEGORY NAME]&max=[MAX LINKS]&title=[TITLE]&internalstyle=[DEFAULT STYLING (1 or 0)]&nostyle=[ENABLE LINK STYLES (1 or 0)]`

In [square brackets] are the parameters for TRLM. All of them are optional. Here is an example displaying technology-related websites that uses plain, default styling with a maximum of 16 links.

`https://roxwize.xyz/ext/trlm/?category=Technology&max=16&internalstyle=1`

I might streamline the process of building the URL into a simple form eventually. Check back for when I get to that.

### Categories

Filtering websites by categories can be done to help narrow which sites you want to link to. Keep in mind that some categories may be sparsely populated, and some may have no links at all.

The following categories are **explicitly defined**:
- Technology
- Art
- Music
- GeneralAndPersonal

If you're adding your site and you think it fits under a different category altogether, don't hesitate to ask for one to be added. Infact, you don't even have to ask. Just include it with the other categories of your website and, if it's not too narrow, it'll get added. For example, if you are a film production company and want to add your site, but a "Film" category does not exist, then still list your website under that nonexistent category. Wouldn't hurt to try.

Support for custom (sub-)categories will come eventually.

### Parameter table

"Default behavior" describes what is done if the parameter is left out of the URL.

Parameter | Description | Default behavior | Example
--- | --- | --- | ---
`category` | Comma-separated list that describes which categories of links to display; see [Categories](#rh-categories). | Displays links from all categories | `Technology,GeneralAndPersonal`
`max` | Specifies the maximum number of links to display | Displays up to eight |
`title` | Specifies custom text for the header above the links | Sets header text to `More cool sites`; you can use `title=` to hide it completely |
`internalstyle` | Use default styling (set to 0 if you are embedding inside a frame and you want to use your website's styling) | Does not use any default CSS |
`nostyle` | Disables custom styles for links | [Does not do that](https://tvtropes.org/pmwiki/pmwiki.php/Main/DepartmentOfRedundancyDepartment) |

## To add your website to TRLM

The simplest way to get your link added is to **[e-mail me](mailto:biscordbro@gmail.com) with the details of your link**. I don't mind how you format it, but I need to know at minimum where it links to, what text the link will display, and what [category](#rh-categories) it'll be in. It can be in multiple categories. If you need a template, refer to [Email template](#rh-email-template).

If a category you want your website to be in doesn't exist then include it regardless and I'll consider adding it.

Also **your link can contain HTML**. This means that if you want to replace your link with a button/image, or if you want to add bold or italics, you're free to do so.

**If you want to add custom CSS to your link**, include that as well in the email (doesn't need to look fancy or be properly formatted); don't treat it as an inline style. `!` refers to your link element.

```css
  ! {
    text-decoration: none;
    font-weight: bold;
    color: #896498;
  }
  !:hover {
    font-weight: normal;
  }
```

If you like trailblazing then you can [use GitHub](#rh-using-github).

### Using GitHub

Adding a link manually requires you to know your way around Git.

In the repository for this website where TRLM's code is stored, the place where all links are stored can be found at [trlm.xml](#). Every link is contained inside `<category>`s. First of all, open that file, and click the pencil button at the top right.

![The pencil icon on GitHub](/static/img/sc/githubedit.png)

It's going to ask you to fork the repository. Go ahead and click the green button to do so.

Once you're done, go back to *trlm.xml*. Find a category that fits your website and add your website in it at the bottom by using this template:

```xml
<link href="[WEBSITE URL]">[LINK TEXT]</link>
<!-- You can use &r; and &l; in your links to append right and left angled brackets respectively -->
```

That is a link in its simplest form. After you've added it, you can open a pull request to add it to the website, or you can add more stuff to it. If you just want to put it in the thing then scroll down.

#### Placing your link in multiple categories

Links can be in multiple different categories at once. This doesn't increase their chance of appearing, but it does allow them to be selected if only one category or the other is chosen.

Give your link a unique `id` (the name of your site will do) and, in another category you want to put your link in, add another `<link>` element with the `ref` attribute set to the `id` you just stated. Self-close it and leave it as-is after that.

```xml
<category name="Technology">
  <link href="https://roxwize.xyz/" id="roxwize">Roxwize</link>
</category>
<category name="GeneralAndPersonal">
  <!-- Include roxwize.xyz in GeneralAndPersonal aswell -->
  <link ref="roxwize" />
</category>
```

#### Giving your link custom styling

There is no need to be boring. If you know CSS and wish to add styling to your link, do not be hesitant.

The `style` attribute of your link dictates what styling it'll have. This is not an inline style. In the attribute, you refer to your element with `!`.

```xml
<!-- You can give it a title too -->
<link
  href="https://roxwize.xyz/"
  title="My cool website"
  style="! { color:black;transition:0.2s; } !:hover { color:red; }"
>
  Roxwize
</link>
```

#### Adding it to the source

If you want your link to actually display on the website itself then you'll need to commit it to the source. This means opening a pull request. I assume if you've chosen this route then you know how to do pull requests.

Go to the fork that you created and find the button that says Contribute.

![The Contribute button clicked to expand a menu with a green "Open pull request" button](/static/img/sc/githubcontribute.png)

Click **Open pull request** to open a pull request to the main repository and, if you feel so obliged, describe what you added. Finalize creating the pull request and your link will probably be added soon.

### Email template

```
Link label:
URL to point to:
Categories:
Alt text (optional):
Styling (optional):
```
