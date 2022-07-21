
CATEGORIES = {
    COFFEE: 'Coffee',
    JUICE: 'Juice',
    MILK_TEA: 'Milk Tea',
}

Menu = [
    {
        id: 0,
        category: CATEGORIES.COFFEE,
        names: ['Black Coffee', 'White Coffee', 'Capuchino', 'Latte'],
        images:[coffee_imgs[0], coffee_imgs[1], coffee_imgs[2], coffee_imgs[3]],
        
        extras: [
                {name:'iced', more: +0, added:true},
            ],                                  #true: default
        
        sizes: [{name:'normal', selected: true}, 
                {name:'large', selected: false}
            ],                                                              #true: default

        prices: [[{name:'normal', more:15}, {name:'large', more:20}],       #for Coffee + size 
                 [{name:'normal', more:20}, {name:'large', more:25}],       #for White Coffee + size
                 [{name:'normal', more:30}, {name:'large', more:40}],       #for Capuchino + size
                 [{name:'normal', more:30}, {name:'large', more:40}]
                ]                                                           #for Latte + size
    },
    
    {
        id: 1,
        category: CATEGORIES.MILK_TEA,
        names: ['Milk Tea', 'Matcha Tea'], 
        images:[milk_tea_imgs[0], milk_tea_imgs[1]],
        
        extras: [{name:'Bubble', more:+5, added:true}, 
                 {name:'Jelly', more:+5, added:false}, 
                 {name:'Chia Nut', more:+10, added:false},
                ],
        
        sizes: [{name:'normal', selected:true}, 
                {name:'large', selected:false},
            ],
        prices: [[{name:'normal', more:20}, {name:'large', more: 30}], 
                 [{name:'normal', more:30}, {name:'large', more: 40}]
                ]
    },

    {
        id: 2,
        category: CATEGORIES.JUICE,  
        names: ['Avocado', 'Banana', 'Orange'],
        images:[juice_imgs[0], juice_imgs[1], juice_imgs[2],],
        
        extras: [{name:'Chia Nut', more:+10, added:false}, 
                 {name:'Jelly', more:+5, added:false},
                ],

        sizes: [{name:'normal', selected:true}, 
                {name:'large', selected:false}
            ],
        prices: [[{name:'normal', more:40}, {name:'large', more:50}],       #for Avocado + size
                 [{name:'normal', more:30}, {name:'large', more:40}],       #for Banana + size
                 [{name:'normal', more:30}, {name:'large', more:40}],                
                ]                                                           #for Orange + size
    }
]