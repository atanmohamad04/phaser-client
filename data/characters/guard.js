const Guard = {
  class: "Guard",

  subclasses: [
    {
      subclass: "Swordmaster",

      baseStats: {
        attack: 158,
        hp: 1080,
        defense: 76
      },

      skills: [
        {
          name: "Fractured Edge",
          type: "passive",
          trigger: "onAttack",

          chance: 0.25,

          effect: {
            type: "debuff",
            targetStat: "defense",
            value: 0.1,
            duration: 6,
            stackable: true,
            maxStack: 2
          }
        },

        {
          name: "Flow of Blades",
          type: "passive",
          trigger: "onCombo",

          effect: {
            type: "modifier",
            target: "comboMultiplier",
            value: 1.1
          }
        },

        {
          name: "Final Severance",
          type: "ultimate",
          trigger: "onUltimate",

          effect: {
            type: "nextAttackModifier",
          
            multiplier: 1.5,
            missingHpScaling: 0.2,
          
            consumeOnUse: true
          }
        }
      ]
    },

    {
      subclass: "Primal Guard",

      baseStats: {
        attack: 156,
        hp: 1120,
        defense: 83
      },

      skills: [
        {
          name: "Hunter’s Dominance",
          type: "passive",
          trigger: "onAttack",

          chance: 0.22,

          effect: {
            type: "statSwapDebuff",
            targetStats: {
              attack: 0.12,
              enemyAttack: -0.15
            },
            duration: 4
          }
        },

        {
          name: "Wild Evasion",
          type: "passive",
          trigger: "onIncomingAttack",

          chance: 0.1,

          effect: {
            type: "dodge"
          }
        },

        {
          name: "Blood Hound Ascension",
          type: "ultimate",
          trigger: "onUltimate",

          duration: "infinite",

          effect: [
            {
              type: "buff",
              targetStat: "hp",
              value: 0.15
            },
            {
              type: "buff",
              targetStat: "attack",
              value: 0.1
            },
            {
              type: "stateChange",
              target: "attackType",
              value: "true_damage"
            },
            {
              type: "passiveRule",
              rule: "minimumHpLock",
              value: 1
            },
            {
              type: "hpDrain",
              value: 0.01,
              interval: 1
            },
            {
              type: "deathDelay",
              condition: "hp == 1 && enemyAlive",
              delay: 15
            }
          ]
        }
      ]
    }
  ]
};

export default Guard;