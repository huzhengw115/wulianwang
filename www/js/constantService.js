angular.module('constantService', [])
.constant('homeViewUrl',{
	informationView: ['src/information/hots/hots.html',
      'src/information/policy/policy.html',
      'src/information/idea/idea.html',
      'src/information/special/special.html',
      'src/information/shop/shop.html'
  		],
  programmeView: ['src/programme/allProgramme/allProgramme.html',
      'src/programme/newProgramme/newProgramme.html',
      'src/programme/hotProgramme/hotProgramme.html',
      'src/programme/eleProgramme/eleProgramme.html'
      ],
  goodsView: ['src/goods/tender/tender.html',
      'src/goods/investment/investment.html',
      'src/goods/bids/bids.html'
      ],
  homeTemplate: ['',
        '',
        '',
        'src/meets/meets.html',
        'src/waiter/waiter.html',
        'src/read/read.html',
        '',
        'src/find/find.html'
      ],
  homesFile: ['src/homes/homesCtrl.js', 'src/homes/homes.css'],
  informationFile: [['src/information/hots/hotsCtrl.js', 'src/information/hots/hots.css', 'src/information/optionSelect/optionSelectCtrl.js'],
              ['src/information/policy/policyCtrl.js', 'src/information/policy/policy.css'],
              ['src/information/idea/ideaCtrl.js', 'src/information/idea/idea.css'],
              ['src/information/special/specialCtrl.js', 'src/information/special/special.css'],
              ['src/information/shop/shopCtrl.js', 'src/information/shop/shop.css']
            ],
  programmeFile: [['src/programme/allProgramme/allProgrammeCtrl.js', 'src/programme/allProgramme/allProgramme.css'],
              ['src/programme/newProgramme/newProgrammeCtrl.js', 'src/programme/newProgramme/newProgramme.css'],
              ['src/programme/hotProgramme/hotProgrammeCtrl.js', 'src/programme/hotProgramme/hotProgramme.css'],
              ['src/programme/eleProgramme/eleProgrammeCtrl.js', 'src/programme/eleProgramme/eleProgramme.css']
            ],
  meetsFile: ['src/meets/meetsCtrl.js', 'src/meets/meets.css'],
  goodsFile: [['src/goods/tender/tenderCtrl.js', 'src/goods/tender/tender.css'],
              ['src/goods/investment/investmentCtrl.js', 'src/goods/investment/investment.css'],
              ['src/goods/bids/bidsCtrl.js', 'src/goods/bids/bids.css']
            ],
  waiterFile: ['src/waiter/waiterCtrl.js', 'src/waiter/waiter.css'],
  findFile: ['src/find/findCtrl.js', 'src/find/find.css']
})

.service('homeSrcService', function () {
  var homeSrc = [{
    'id': 0,
    'href': 'information',
    "title": "资讯"
  },{
    'id': 1,
    'href': 'programme',
    "title": "方案"
  },{
    'id': 2,
    'href': 'goods',
    "title": "商机"
  },{
    'id': 3,
    'href': 'meets',
    "title": "活动"
  },{
    'id': 4,
    'href': 'waiter',
    "title": "服务"
  },{
    'id': 5,
    'href': 'more',
    "title": "更多"
  }]

  return {
    homeSrc: homeSrc
  }
})