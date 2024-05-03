const permissionsData =  [
  {
    path: "/adminAuth",
    meta: {
      "title": "权限管理",
      "icon": "permission",
    },
    children: [
      {
        path: "/adminAuth/getRoleList",
        name: "getRoleList",
        meta: {
          title: "角色列表",
  
        }
      },
      {
        path: "/adminAuth/adminList",
        name: "adminList",
        meta: {
          title: "账号列表",

        },           
      },
      {
        path: "/adminAuth/permissionList",
        name: "permissionList",
        meta: {
          title: "权限列表",
          roles: ['supAdmin','admin'],
          auths: [
            {supAdmin: ['permission:btn:add','permission:btn:edit','permission:btn:delete']},
            {admin: ['permission:btn:add','permission:btn:edit']}
          ]             
        }
      },
      {
        path: "/account/detail",
        name: "detail",
        meta: {
          title: "账号详情",
          roles: ['supAdmin','admin'], 
          auths: [
            {supAdmin: ['permission:btn:add','permission:btn:edit','permission:btn:delete']},
            {admin: ['permission:btn:add','permission:btn:edit']}
          ],  
          hidden: true
        }           
      }
    ]
  },
  {
    path: "/third",
    meta: {
      title: "三方库管理",
      icon: "other",
    },
    children: [
      {
        path: "/third/editor",
        name: "editor",
        meta: {
          title: "富文本",
          roles: ['supAdmin','admin','user'], 
          auths: [
            {supAdmin: ['permission:btn:add','permission:btn:edit','permission:btn:delete']},
            {admin: ['permission:btn:add','permission:btn:edit']}
          ]
        }
      },
      {
        path: "/third/markdown",
        name: "markdown",
        meta: {
          title: "markdown",
          roles: ['supAdmin','admin','user'], 
          auths: [
            {supAdmin: ['permission:btn:add','permission:btn:edit','permission:btn:delete']},
            {admin: ['permission:btn:add','permission:btn:edit']}
          ]
        }
      }
    ]
  },
  {
    path: "/cssAnimation",
    meta: {
      title: "CSS动画",
      icon: "other",
    },
    children: [
      {
        path: "/cssAnimation/hover",
        name: "hover",
        meta: {
          title: "hover 动画",
          roles: ['supAdmin','admin','user'], 
        },
        children: [
          {
            path: "/hover/hoverShiningBtn",
            name: "hoverShiningBtn",
            meta: {
              title: "会发光的按钮",
              roles: ['supAdmin','admin','user'], 
            }
          },
          {
            path: "/hover/hoverFillText",
            name: "hoverFillText",
            meta: {
              title: "菜单填充效果",
              roles: ['supAdmin','admin','user'], 
            }
          },
          {
            path: "/hover/hoverSlideMenu",
            name: "hoverSlideMenu",
            meta: {
              title: "菜单扫描效果",
              roles: ['supAdmin','admin','user'], 
            }
          },
          {
            path: "/hover/hoverBorderBtn",
            name: "hoverBorderBtn",
            meta: {
              title: "border流动按钮",
              roles: ['supAdmin','admin','user'], 
            }
          }
        ]
      },
      {
        path: "/cssAnimation/shootingStar",
        name: "shootingStar",
        meta: {
          title: "流星雨",
          roles: ['supAdmin','admin','user'], 
        }
      },
      {
        path: "/cssAnimation/jumpBlock",
        name: "jumpBlock",
        meta: {
          title: "能跳动的icon",
          roles: ['supAdmin','admin','user'], 
        }
      },
      {
        path: "/cssAnimation/downBtn",
        name: "downBtn",
        meta: {
          title: "奇怪的下载按钮",
          roles: ['supAdmin','admin','user'], 
        }
      },
      {
        path: "/cssAnimation/videoMaskText",
        name: "videoMaskText",
        meta: {
          title: "以视频为背景的文字",
          roles: ['supAdmin','admin','user'], 
        }
      },
      {
        path: "/cssAnimation/filpCard",
        name: "filpCard",
        meta: {
          title: "翻卡片动画",
          roles: ['supAdmin','admin','user'], 
        }
      },
      {
        path: "/cssAnimation/slidePic",
        name: "slidePic",
        meta: {
          title: "图片无缝滚动切换",
          roles: ['supAdmin','admin','user'], 
        }
      },
      {
        path: "/cssAnimation/bubbleFloat",
        name: "bubbleFloat",
        meta: {
          title: "ios动态气泡壁纸",
          roles: ['supAdmin','admin','user'], 
        }
      },
      {
        path: "/cssAnimation/waveloading",
        name: "waveloading",
        meta: {
          title: "水波纹loading效果",
          roles: ['supAdmin','admin','user'], 
        }
      },
      {
        path: "/cssAnimation/fullscreenMenu",
        name: "fullscreenMenu",
        meta: {
          title: "全屏菜单动画",
          roles: ['supAdmin','admin','user'], 
        }
      },
      {
        path: "/cssAnimation/tabs",
        name: "tabs",
        meta: {
          title: "有趣的tab效果",
          roles: ['supAdmin','admin','user'], 
        }
      },
      {
        path: "/cssAnimation/clock",
        name: "clock",
        meta: {
          title: "时钟效果",
          roles: ['supAdmin','admin','user'], 
        }
      },
      {
        path: "/cssAnimation/snowScratch",
        name: "snowScratch",
        meta: {
          title: "雪地划痕",
          roles: ['supAdmin','admin','user'], 
        }
      },

    ]
  },
  {
    path: "/vueUse",
    meta: {
      title: "vueUse",
      icon: "other",
    },
    children: [
      {
        path: "/vueUse/elements",
        name: "elements",
        meta: {
          title: "会发光的按钮",
          roles: ['supAdmin','admin','user'], 
        },
        children: [
          {
            path: "/elements/useDraggable",
            name: "useDraggable",
            meta: {
              title: "useDraggable",
              roles: ['supAdmin','admin','user'], 
            }
          },
          {
            path: "/elements/useDropZone",
            name: "useDropZone",
            meta: {
              title: "useDropZone",
              roles: ['supAdmin','admin','user'], 
            }
          },
          {
            path: "/elements/useIntersectionObserver",
            name: "useIntersectionObserver",
            meta: {
              title: "useIntersectionObserver",
              roles: ['supAdmin','admin','user'], 
            }
          }
        ]
      },
      {
        path: "/vueUse/component",
        name: "component",
        meta: {
          title: "component",
          roles: ['supAdmin','admin','user'], 
        },
        children: [
          {
            path: "/component/createReusableTemplate",
            name: "createReusableTemplate",
            meta: {
              title: "createReusableTemplate",
              roles: ['supAdmin','admin','user'], 
            }
          }
        ]
      }
    ]
  }
]
module.exports = permissionsData
