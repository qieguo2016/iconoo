#iconoo

**iconoo**是一个纯CSS的图标库，基于 **[icono][1]** 改造而成，增加了整体缩放功能（线宽不变）；

**[LIVE DEMO][2]**

##How to use

- **[下载][3]** 后直接link引入css文件，然后直接在标签中引入相应的class即可，例如：

`<i class="iconoo-mail"></i>`

`<div class="iconoo-mail"></div>`

`<span class="iconoo-mail"></span>`

`<whatever class="iconoo-mail"></whatever>`

- 如果你使用webpack，那么可以直接使用安装npm包并引入iconoo库即可。

```bash
// 安装包
npm i iconoo

// 通过webpack引入
require('iconoo');
```

**PS：**

- 设置font-size可等比缩放图标，同时保持线宽不变，默认值为20px（图标宽高为30px）

- 设置zoom或者transform scale可等比缩放图标，线宽也同时变大

-------

#iconoo

**iconoo** is an icon pack that needs no external resources. **iconoo** is base on **[icono][1]**, and it is flexible, and you don't need to calculate any diamesion.

[LIVE DEMO][2]

##How to use

- [Download][3] the css file and link it to your page, then use these class in every tag you want, like these：

`<i class="iconoo-mail"></i>`

`<div class="iconoo-mail"></div>`

`<span class="iconoo-mail"></span>`

`<whatever class="iconoo-mail"></whatever>`

- if you use webpack，then you can install iconoo via npm and import into your app like this: 

```bash
npm i iconoo

require('iconoo');
```

PS: You can simple adjust the size of icons by setting its font-size, of course you can also scale icons by zoom or transform: scale.
  
[1]:https://github.com/saeedalipoor/icono
[2]:https://qieguo2016.github.io/iconoo/
[3]:https://github.com/qieguo2016/iconoo/blob/master/dist/iconoo.min.css
  
------

##Available classes
* `icono-home`
* `icono-mail`
* `icono-rss`
* `icono-hamburger`
* `icono-plus`
* `icono-cross`
* `icono-check`
* `icono-power`
* `icono-heart`
* `icono-infinity`
* `icono-flag`
* `icono-file`
* `icono-image`
* `icono-video`
* `icono-music`
* `icono-headphone`
* `icono-document`
* `icono-folder`
* `icono-pin`
* `icono-smile`
* `icono-eye`
* `icono-sliders`
* `icono-share`
* `icono-sync`
* `icono-reset`
* `icono-dropper`
* `icono-tiles`
* `icono-list`
* `icono-chain`
* `icono-rename`
* `icono-search`
* `icono-book`
* `icono-forbidden`
* `icono-trash`
* `icono-keyboard`
* `icono-mouse`
* `icono-user`
* `icono-crop`
* `icono-display`
* `icono-microphone`
* `icono-asterisk`
* `icono-terminal`
* `icono-paperClip`
* `icono-market`
* `icono-clock`
* `icono-textAlignRight`
* `icono-textAlignCenter`
* `icono-textAlignLeft`
* `icono-indent`
* `icono-outdent`
* `icono-frown`
* `icono-meh`
* `icono-locationArrow`
* `icono-plusCircle`
* `icono-checkCircle`
* `icono-crossCircle`
* `icono-exclamation`
* `icono-exclamationCircle`
* `icono-comment`
* `icono-commentEmpty`
* `icono-areaChart`
* `icono-pieChart`
* `icono-barChart`
* `icono-bookmark`
* `icono-bookmarkEmpty`
* `icono-filter`
* `icono-volume`
* `icono-volumeLow`
* `icono-volumeMedium`
* `icono-volumeHigh`
* `icono-volumeDecrease`
* `icono-volumeIncrease`
* `icono-volumeMute`
* `icono-tag`
* `icono-calendar`
* `icono-camera`
* `icono-piano`
* `icono-ruler`
* `icono-cup`
* `icono-creditCard`
* `icono-play`
* `icono-pause`
* `icono-stop`
* `icono-rewind`
* `icono-forward`
* `icono-next`
* `icono-previous`
* `icono-caretRight`
* `icono-caretLeft`
* `icono-caretUp`
* `icono-caretDown`
* `icono-rightArrow`
* `icono-leftArrow`
* `icono-upArrow`
* `icono-downArrow`
* `icono-sun`
* `icono-moon`
* `icono-disqus`
* `icono-cart`
* `icono-caretRightCircle`
* `icono-caretLeftCircle`
* `icono-caretUpCircle`
* `icono-caretDownCircle`
* `icono-caretRightSquare`
* `icono-caretLeftSquare`
* `icono-caretUpSquare`
* `icono-caretDownSquare`
* `icono-dribbble`
* `icono-sitemap`
* `icono-spinner`
* `icono-circle`
* `icono-ellipsis`


##Development & Contributing

Using npm install the dependencies:

    $ npm install

Run Gulp

    $ gulp

