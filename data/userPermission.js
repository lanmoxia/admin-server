
const {permission} = require('./svgDatas')
const permissionsData = 
  {
    data: [
      {
        id: '2',
        "name": "三方库管理",
        "parent_id": "0",
        "type": "1",
        "url": "/third/editor",
        "icon": permission,
        "children": [
          {
            "id": "2-1",
            "name": "富文本",
            "parent_id": "2",
            "type": "2",
            "url": "/third/editor",
            "icon": permission,
            "buttonList": [
              {
                "id": "2-1-1",
                "name": "查询",
                "parent_id": "2-1",
                "type": "3",
                "url": "/third/editor"
              }
            ]
          },
          {
            "id": "2-2",
            "name": "markdown",
            "parent_id": "2",
            "type": "2",
            "url": "/third/markdown",
            "icon": permission,
            "buttonList": [
              {
                "id": "2-2-1",
                "name": "查询",
                "parent_id": "2-2",
                "type": "3",
                "url": "/third/markdown"
              }

            ]
          }
        ]
      },
      {
        id: '3',
        "name": "音频可视化",
        "icon": permission,
        "parent_id": "0",
        "type": "1",
        "url": "/audio/canvas",
        "children": [
          {
            "id": "3-1",
            "name": "canvas+audio",
            "parent_id": "3",
            "icon": permission,
            "type": "2",
            "url": "/audio/canvas"

          },
          {
            "id": "3-2",
            "name": "wavesurfer",
            "icon": permission,
            "parent_id": "3",
            "type": "2",
            "url": "/audio/wavesurfer"

          }

        ]
      },
      {
        id: '4',
        "name": "CSS动画",
        "icon": permission,
        "parent_id": "0",
        "type": "1",
        "url": "/cssAnimation/shootingStar",
        "children": [
          {
            "id": "4-100",
            "name": "hover动画效果",
            "icon": permission,
            "parent_id": "3",
            "type": "2",
            "url": "/cssAnimation/hover",
            children: [
              {
                "id": "4-5",
                "name": "会发光的按钮",
                "parent_id": "3",
                "type": "2",
                "icon": permission,

                "url": "/hover/hoverShiningBtn"


              },
              {
                "id": "4-7",
                "name": "菜单填充效果",
                "parent_id": "3",
                "type": "2",
                "icon": permission,

                "url": "/hover/hoverFillText"

              },
              {
                "id": "4-12",
                "name": "菜单扫描效果",
                "parent_id": "3",
                "type": "2",
                "icon": permission,

                "url": "/hover/hoverSlideMenu"
              },
              {
                "id": "4-14",
                "name": "border流动按钮",
                "parent_id": "3",
                "type": "2",
                "icon": permission,

                "url": "/hover/hoverBorderBtn"
              },
            ]
          },
          {
            "id": "4-1",
            "name": "流星雨",
            "parent_id": "3",
            "type": "2",
            "icon": permission,

            "url": "/cssAnimation/shootingStar"

          },
          {
            "id": "4-2",
            "name": "能跳动的icon",
            "parent_id": "3",
            "icon": permission,

            "type": "2",
            "url": "/cssAnimation/jumpBlock"

          },
          {
            "id": "4-3",
            "name": "奇怪的下载按钮",
            "parent_id": "3",
            "icon": permission,

            "type": "2",
            "url": "/cssAnimation/downBtn"

          },
          {
            "id": "4-4",
            "name": "以视频为背景的文字",
            "parent_id": "3",
            "type": "2",
            "icon": permission,

            "url": "/cssAnimation/videoMaskText"

          },
          {
            "id": "4-6",
            "name": "翻卡片动画",
            "parent_id": "3",
            "icon": permission,
            "type": "2",
            "url": "/cssAnimation/filpCard"

          },
          {
            "id": "4-8",
            "name": "图片无缝滚动切换",
            "parent_id": "3",
            "type": "2",
            "icon": permission,

            "url": "/cssAnimation/slidePic"

          },
          {
            "id": "4-9",
            "name": "ios动态气泡壁纸",
            "parent_id": "3",
            "type": "2",
            "icon": permission,

            "url": "/cssAnimation/bubbleFloat"

          },
          {
            "id": "4-10",
            "name": "水波纹loading效果",
            "parent_id": "3",
            "type": "2",
            "icon": permission,

            "url": "/cssAnimation/waveloading"
          },
          {
            "id": "4-11",
            "name": "全屏菜单动画",
            "parent_id": "3",
            "type": "2",
            "icon": permission,
            "url": "/cssAnimation/fullscreenMenu"
          },
          {
            "id": "4-13",
            "name": "有趣的tab效果",
            "parent_id": "3",
            "type": "2",
            "icon": permission,
            "url": "/cssAnimation/tabs"
          },
          {
            "id": "4-14",
            "name": "时钟效果",
            "parent_id": "3",
            "type": "2",
            "icon": permission,
            "url": "/cssAnimation/clock"
          },
          {
            "id": "4-15",
            "name": "雪地划痕",
            "parent_id": "3",
            "type": "2",
            "icon": permission,
            "url": "/cssAnimation/snowScratch"
          },

        ]
      },
      {
        id: '5',
        "name": "vueUse",
        "parent_id": "0",
        "type": "1",
        "icon": permission,

        "url": "/vueUse/elements",
        "children": [
          {
            "id": "5-1",
            "name": "elements",
            "parent_id": "3",
            "icon": permission,
            "type": "2",
            "url": "/vueUse/elements",
            children: [
              {
                "id": "5-1-1",
                "name": "useDraggable",
                "parent_id": "3",
                "type": "2",
                "icon": permission,
                "url": "/elements/useDraggable"

              },
              {
                "id": "5-1-2",
                "name": "useDropZone",
                "parent_id": "3",
                "type": "2",
                "icon": permission,
                "url": "/elements/useDropZone"

              },
              {
                "id": "5-1-3",
                "name": "useIntersectionObserver",
                "parent_id": "3",
                "type": "2",
                "icon": permission,
                "url": "/elements/useIntersectionObserver"

              },
            ]
          },
          {
            "id": "5-2",
            "name": "component",
            "parent_id": "3",
            "icon": permission,
            "type": "2",
            "url": "/vueUse/component",
            children: [
              {
                "id": "5-2-1",
                "name": "createReusableTemplate",
                "parent_id": "3",
                "type": "2",
                "icon": permission,
                "url": "/component/createReusableTemplate"

              }

            ]
          },

        ]
      }

    ]
  }

module.exports = permissionsData
