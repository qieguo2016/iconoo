#iconoo

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Dependency status][david-dm-image]][david-dm-url] [![Dev Dependency status][david-dm-dev-image]][david-dm-dev-url]
[npm-url]: https://npmjs.org/package/iconoo
[downloads-image]: http://img.shields.io/npm/dm/iconoo.svg
[npm-image]: http://img.shields.io/npm/v/iconoo.svg
[david-dm-url]:https://david-dm.org/qieguo2016/iconoo
[david-dm-image]:https://david-dm.org/qieguo2016/iconoo.svg
[david-dm-dev-url]:https://david-dm.org/qieguo2016/iconoo#info=devDependencies
[david-dm-dev-image]:https://david-dm.org/qieguo2016/iconoo/dev-status.svg

**iconoo**是一个纯CSS的图标库，基于 **[icono][1]** 改造而成，增加了整体缩放功能（线宽不变）和`webpack`引入方式。

**[LIVE DEMO][2]**

![iconoo][3]

##How to use

- **[下载][4]** 后直接link引入css文件，然后直接在标签中引入相应的class即可，例如：

`<i class="iconoo-home"></i>`

`<div class="iconoo-home"></div>`

`<span class="iconoo-home"></span>`

`<whatever class="iconoo-home"></whatever>`

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

- 如果需要改变线宽和其他全局属性，请下载源码，更改variables.sass内的相应变量

-------

#iconoo

**iconoo** is an icon pack that needs no external resources. **iconoo** is base on **[icono][1]**, and it is flexible, and you don't need to calculate any diamesion.

[LIVE DEMO][2]

##How to use

- [Download][3] the css file and link it to your page, then use these class in every tag you want, like these：

`<i class="iconoo-home"></i>`

`<div class="iconoo-home"></div>`

`<span class="iconoo-home"></span>`

`<whatever class="iconoo-home"></whatever>`

- if you use webpack，then you can install iconoo via npm and import into your app like this: 

```bash
npm i iconoo

require('iconoo');
```

PS: You can simple adjust the size of icons by setting its font-size, of course you can also scale icons by zoom or transform: scale.
  
[1]:https://github.com/saeedalipoor/icono
[2]:https://qieguo2016.github.io/iconoo/
[3]:https://github.com/qieguo2016/iconoo/blob/master/.github/iconoo.png
[4]:https://github.com/qieguo2016/iconoo/blob/master/dist/iconoo.min.css
  
------

##Available classes

 * `iconoo-pin`
 * `iconoo-locationArrow`
 * `iconoo-sync`
 * `iconoo-reset`
 * `iconoo-share`
 * `iconoo-search`
 * `iconoo-home`
 * `iconoo-bars`
 * `iconoo-ellipsis`
 * `iconoo-tiles`
 * `iconoo-list`
 * `iconoo-smile`
 * `iconoo-frown`
 * `iconoo-meh`
 * `iconoo-volume`
 * `iconoo-volumeLow`
 * `iconoo-volumeMedium`
 * `iconoo-volumeHigh`
 * `iconoo-volumeDecrease`
 * `iconoo-volumeIncrease`
 * `iconoo-volumeMute`
 * `iconoo-play`
 * `iconoo-pause`
 * `iconoo-stop`
 * `iconoo-rewind`
 * `iconoo-forward`
 * `iconoo-next`
 * `iconoo-previous`
 * `iconoo-rightArrow`
 * `iconoo-leftArrow`
 * `iconoo-upArrow`
 * `iconoo-downArrow`
 * `iconoo-check`
 * `iconoo-checkCircle`
 * `iconoo-cross`
 * `iconoo-crossCircle`
 * `iconoo-plus`
 * `iconoo-plusCircle`
 * `iconoo-caretRight`
 * `iconoo-caretLeft`
 * `iconoo-caretUp`
 * `iconoo-caretDown`
 * `iconoo-caretRightCircle`
 * `iconoo-caretLeftCircle`
 * `iconoo-caretUpCircle`
 * `iconoo-caretDownCircle`
 * `iconoo-caretRightSquare`
 * `iconoo-caretLeftSquare`
 * `iconoo-caretUpSquare`
 * `iconoo-caretDownSquare`
  
## Development & Contributing

Using npm install the dependencies:

    $ npm install

Run Gulp

    $ gulp

