const Specialist = {
  class: "Specialist",

  subclasses: [
    {
      subclass: "Alchemist",

      baseStats: {
        attack: 133,
        hp: 1580,
        defense: 107
      },

      skills: [
        {
          name: "Catalytic Disruption",
          type: "passive",
          trigger: "onStart",

          effect: {
            type: "modifyStatusDuration",
            status: "stagger",
            value: 1.4
          }
        },

        {
          name: "Corrosive Infusion",
          type: "passive",
          trigger: "onAttack",

          effect: {
            type: "dot",
            targetStat: "attack",
            value: 0.1,
            duration: 3
          }
        },

        {
          name: "Murky Night",
          type: "ultimate",
          trigger: "onUltimate",

          effect: [
            {
              type: "cleanseSelfStatus",
              targetStatus: "stagger"
            },
            {
              type: "silence",
              priority: "ultimate_first",
              duration: 20
            }
          ]
        }
      ]
    }
  ]
};

export default Specialist;