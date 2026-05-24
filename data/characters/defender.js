const Defender = {
  class: "Defender",

  subclasses: [
    {
      subclass: "Protector",

      baseStats: {
        attack: 150,
        hp: 1350,
        defense: 88
      },

      skills: [
        {
          name: "Thorned Bulwark",
          type: "passive",
          trigger: "onBattleStart",
        
          effect: [
            {
              type: "buff",
              targetStat: "defense",
              value: 0.15
            },
            {
              type: "reflect",
              ratio: 0.1,
              scaleBy: "attack"
            }
          ]
        },

        {
          name: "Last Bastion",
          type: "passive",
          trigger: "onHpChange",

          effect: {
            type: "scalingBuff",
            targetStat: "defense",
            maxBonus: 0.1,
            condition: {
              hpThreshold: 0.4,
              direction: "decreasing"
            }
          }
        },

        {
          name: "Fortress of Purity",
          type: "ultimate",
          trigger: "onUltimate",

          effect: [
            {
              type: "buff",
              targetStat: "hp",
              value: 0.15,
              duration: 16
            },
            {
              type: "buff",
              targetStat: "defense",
              value: 0.05,
              duration: 16,
            },
            {
              type: "cleanse"
            },
            {
              type: "statusImmunity",
              target: "debuff",
              duration: 16,
            }
          ]
        }
      ]
    },

    {
      subclass: "Guardian",

      baseStats: {
        attack: 153,
        hp: 1420,
        defense: 80
      },

      skills: [
        {
          name: "Recovery Protocol",
          type: "passive",
          trigger: "onNoDamageTaken",

          condition: {
            duration: 9
          },

          effect: {
            type: "heal",
            value: 0.05,
            target: "maxHp"
          }
        },

        {
          name: "Penumbral Image",
          type: "passive",
          trigger: "onGameStart",
        
          condition: {
            interval: 15,
            maxStack: 3
          },
        
          effect: [
            {
              type: "reduceStatusDuration",
              status: "stagger",
              value: 1.4
            },
            {
              type: "buff",
              targetStat: "hp",
              value: 0.01,
              stackable: true
            },
            {
              type: "buff",
              targetStat: "defense",
              value: 0.005,
              stackable: true
            }
          ]
        },

        {
          name: "Myriad Grains",
          type: "ultimate",
          trigger: "onUltimate",

          effect: [
            {
              type: "buff",
              targetStat: "attack",
              value: 0.15,
              duration: 20
            },
            {
              type: "replaceAttackWithHeal",
              ratio: 0.3,
              duration: 20,
            },
            {
              type: "damageReduction",
              value: 0.1,
              duration: 20,
              tag: "sanctuary"
            }
          ]
        }
      ]
    }
  ]
};

export default Defender;