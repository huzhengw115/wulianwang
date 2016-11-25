angular.module('constantService', [])
.constant('homeViewUrl',{
	informationView: ['src/home/slide-box/information/hots/hots.html',
      'src/home/slide-box/information/policy/policy.html',
      'src/home/slide-box/information/idea/idea.html',
      'src/home/slide-box/information/special/special.html',
      'src/home/slide-box/information/shop/shop.html'
  		],
  programmeView: ['src/home/slide-box/programme/allProgramme/allProgramme.html',
      'src/home/slide-box/programme/newProgramme/newProgramme.html',
      'src/home/slide-box/programme/hotProgramme/hotProgramme.html',
      'src/home/slide-box/programme/eleProgramme/eleProgramme.html'
      ],
  goodsView: ['src/home/slide-box/goods/tender/tender.html',
      'src/home/slide-box/goods/investment/investment.html',
      'src/home/slide-box/goods/bids/bids.html'
      ],
  homeTemplate: ['src/home/slide-box/homes/homes.html',
        'src/home/slide-box/information/hots/hots.html',
        'src/home/slide-box/programme/hotProgramme/hotProgramme.html',
        'src/home/slide-box/goods/tender/tender.html',
        'src/home/slide-box/meets/meets.html',
        'src/home/slide-box/waiter/waiter.html'
      ],
  homesFile: ['src/home/slide-box/homes/homesCtrl.js', 'src/home/slide-box/homes/homes.css'],
  informationFile: [['src/home/slide-box/information/hots/hotsCtrl.js', 'src/home/slide-box/information/hots/hots.css', 'src/home/slide-box/information/optionSelect/optionSelectCtrl.js'],
              ['src/home/slide-box/information/policy/policyCtrl.js', 'src/home/slide-box/information/policy/policy.css'],
              ['src/home/slide-box/information/idea/ideaCtrl.js', 'src/home/slide-box/information/idea/idea.css'],
              ['src/home/slide-box/information/special/specialCtrl.js', 'src/home/slide-box/information/special/special.css'],
              ['src/home/slide-box/information/shop/shopCtrl.js', 'src/home/slide-box/information/shop/shop.css']
            ],
  programmeFile: [['src/home/slide-box/programme/allProgramme/allProgrammeCtrl.js', 'src/home/slide-box/programme/allProgramme/allProgramme.css'],
              ['src/home/slide-box/programme/newProgramme/newProgrammeCtrl.js', 'src/home/slide-box/programme/newProgramme/newProgramme.css'],
              ['src/home/slide-box/programme/hotProgramme/hotProgrammeCtrl.js', 'src/home/slide-box/programme/hotProgramme/hotProgramme.css'],
              ['src/home/slide-box/programme/eleProgramme/eleProgrammeCtrl.js', 'src/home/slide-box/programme/eleProgramme/eleProgramme.css']
            ],
  meetsFile: ['src/home/slide-box/meets/meetsCtrl.js', 'src/home/slide-box/meets/meets.css'],
  goodsFile: [['src/home/slide-box/goods/tender/tenderCtrl.js', 'src/home/slide-box/goods/tender/tender.css'],
              ['src/home/slide-box/goods/investment/investmentCtrl.js', 'src/home/slide-box/goods/investment/investment.css'],
              ['src/home/slide-box/goods/bids/bidsCtrl.js', 'src/home/slide-box/goods/bids/bids.css']
            ],
  waiterFile: ['src/home/slide-box/waiter/waiterCtrl.js', 'src/home/slide-box/waiter/waiter.css']
})