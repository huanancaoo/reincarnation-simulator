import { describe, it, expect } from 'vitest';
import { LifeSimulatorEngine } from '../lifeSimulator';
import { TALENTS_POOL } from '../../data/talents';
import { BIRTH_LOCATIONS, FAMILY_BACKGROUNDS, getLocationsByRealm, getFamiliesByRealm } from '../../data/locations';
import { ANIMAL_SPECIES } from '../../data/animals';
import { LIFE_EVENTS } from '../../data/events';
import { Attributes, InteractiveChoice, Talent } from '../../types/game';

describe('LifeSimulatorEngine', () => {
  it('should draw 10 unique talents from pool', () => {
    const drawn = LifeSimulatorEngine.drawTalents(TALENTS_POOL, 10, 0);
    expect(drawn.length).toBe(10);
    const ids = new Set(drawn.map((t) => t.id));
    expect(ids.size).toBe(10);
  });

  it('should roll valid birth location and family background', () => {
    const loc = LifeSimulatorEngine.rollBirthLocation(BIRTH_LOCATIONS);
    expect(loc).toBeDefined();
    expect(loc.name).toBeTruthy();

    const fam = LifeSimulatorEngine.rollFamilyBackground(FAMILY_BACKGROUNDS);
    expect(fam).toBeDefined();
    expect(fam.title).toBeTruthy();
  });

  it('should correctly calculate initial stats and avoid negative values', () => {
    const baseAllocated: Attributes = {
      beauty: 5,
      intelligence: 5,
      strength: 0,
      money: 0,
      karma: 0,
      luck: 5
    };

    const talents: Talent[] = [
      {
        id: 'test_t1',
        name: '测试天赋',
        description: '测试',
        rarity: 'epic',
        effect: { stats: { beauty: 3, money: -5 } } // money drops below 0
      }
    ];

    const location = BIRTH_LOCATIONS[0];
    const family = FAMILY_BACKGROUNDS[0];

    const stats = LifeSimulatorEngine.calculateInitialStats(
      baseAllocated,
      talents,
      location,
      family
    );

    expect(stats.beauty).toBeGreaterThanOrEqual(8);
    expect(stats.money).toBeGreaterThanOrEqual(0);
  });

  it('should simulate years and handle life events', () => {
    const location = BIRTH_LOCATIONS[0];
    const family = FAMILY_BACKGROUNDS[0];
    const talents = TALENTS_POOL.slice(0, 3);
    const history = new Set<string>();

    const stats: Attributes = {
      beauty: 5,
      intelligence: 5,
      strength: 5,
      money: 5,
      karma: 5,
      luck: 5
    };

    const year0 = LifeSimulatorEngine.simulateYear(
      0,
      stats,
      talents,
      location,
      family,
      history
    );

    expect(year0.log.age).toBe(0);
    expect(year0.log.text).toBeTruthy();
    expect(year0.newStats.strength).toBeGreaterThanOrEqual(5);
  });

  it('should not mark an uneventful decade as a major fate event', () => {
    const stats: Attributes = {
      beauty: 5,
      intelligence: 5,
      strength: 5,
      money: 5,
      karma: 5,
      luck: 5
    };
    const history = new Set(LIFE_EVENTS.map((event) => event.id));

    const result = LifeSimulatorEngine.simulateYear(
      40,
      stats,
      [],
      BIRTH_LOCATIONS[0],
      FAMILY_BACKGROUNDS[0],
      history
    );

    expect(result.log.text).toContain('平平淡淡，安然度过了一岁春秋');
    expect(result.log.isMilestone).toBe(false);
  });

  it('should support animal realm simulation and lifespan check', () => {
    const animal = ANIMAL_SPECIES.find((a) => a.id === 'animal_chicken_speedrun')!;
    const location = BIRTH_LOCATIONS[0];
    const family = FAMILY_BACKGROUNDS[0];
    const history = new Set<string>();

    const stats: Attributes = {
      beauty: 2,
      intelligence: 1,
      strength: 2,
      money: 0,
      karma: 1,
      luck: 1
    };

    // 0岁出栏
    const year0 = LifeSimulatorEngine.simulateYear(
      0,
      stats,
      [],
      location,
      family,
      history,
      'animal',
      animal
    );

    expect(year0.log.text).toContain('出栏');
    expect(year0.isDead).toBe(true);
    expect(year0.deathReason).toContain('烧鸡');
  });

  it('should resolve interactive choice correctly and update stats', () => {
    const choice: InteractiveChoice = {
      id: 'test_choice',
      title: '测试抉择',
      dilemma: '两难处境',
      options: [
        {
          label: '选项A',
          outcomeText: '选择了A',
          effects: { statChanges: { intelligence: 3 } }
        },
        {
          label: '选项B',
          outcomeText: '选择了B',
          effects: { statChanges: { strength: 4 } }
        }
      ]
    };

    const stats: Attributes = {
      beauty: 5,
      intelligence: 5,
      strength: 5,
      money: 5,
      karma: 5,
      luck: 5
    };

    const resA = LifeSimulatorEngine.resolveChoice(choice, 0, stats, 18);
    expect(resA.newStats.intelligence).toBe(8);
    expect(resA.log.choiceMade?.chosen).toBe('选项A');
  });

  it('should calculate proper settlement and ratings for animals', () => {
    const location = BIRTH_LOCATIONS[0];
    const family = FAMILY_BACKGROUNDS[0];
    const panda = ANIMAL_SPECIES.find((a) => a.id === 'animal_panda')!;

    const settlement = LifeSimulatorEngine.calculateSettlement(
      32,
      '国宝一生圆满',
      { beauty: 15, intelligence: 10, strength: 12, money: 12, karma: 10, luck: 12 },
      [],
      location,
      family,
      ['ach_centenarian'],
      'animal',
      panda
    );

    expect(settlement.epitaph).toContain('国宝');
    expect(settlement.karmaEarned).toBeGreaterThan(20);
  });

  it('should support fantasy realm rolling, simulation, and settlement', () => {
    const fantasyLocs = getLocationsByRealm('fantasy');
    const fantasyFams = getFamiliesByRealm('fantasy');

    expect(fantasyLocs.length).toBeGreaterThan(0);
    expect(fantasyFams.length).toBeGreaterThan(0);

    const loc = LifeSimulatorEngine.rollBirthLocation(fantasyLocs);
    const fam = LifeSimulatorEngine.rollFamilyBackground(fantasyFams);

    expect(loc.realm).toContain('fantasy');
    expect(fam.realm).toContain('fantasy');

    // Simulate year 0
    const sim0 = LifeSimulatorEngine.simulateYear(
      0,
      { beauty: 5, intelligence: 5, strength: 5, money: 5, karma: 5, luck: 5 },
      [],
      loc,
      fam,
      new Set(),
      'fantasy'
    );
    expect(sim0.log.text).toContain('紫气');

    // Settlement
    const settlement = LifeSimulatorEngine.calculateSettlement(
      180,
      '渡尽天劫，白日飞升位列仙班',
      { beauty: 20, intelligence: 20, strength: 20, money: 20, karma: 20, luck: 20 },
      [],
      loc,
      fam,
      ['ach_immortal_ascend'],
      'fantasy'
    );
    expect(settlement.epitaph).toContain('羽化登仙');
    expect(settlement.rating).toBe('SSS');
  });
});
