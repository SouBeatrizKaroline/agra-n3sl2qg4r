migrate(
  (app) => {
    const usersCol = app.findCollectionByNameOrId('_pb_users_auth_')
    let userId = ''

    try {
      const existing = app.findAuthRecordByEmail('_pb_users_auth_', '1aspiraqualquer@gmail.com')
      userId = existing.id
    } catch (_) {
      const record = new Record(usersCol)
      record.setEmail('1aspiraqualquer@gmail.com')
      record.setPassword('Skip@Pass')
      record.setVerified(true)
      record.set('name', 'Agra Demo Farmer')
      app.save(record)
      userId = record.id
    }

    // Seed buyers
    const buyersCol = app.findCollectionByNameOrId('buyers')
    const buyersData = [
      {
        name: 'GreenHarvest Distributors',
        company_type: 'distributor',
        location: 'Fresno, CA',
        distance_miles: 12,
        preferred_produce: 'Lettuce, Spinach, Tomatoes',
        preference: 'High demand for leafy greens within 48h',
      },
      {
        name: 'MapleFresh Retail',
        company_type: 'retailer',
        location: 'Toronto, ON',
        distance_miles: 45,
        preferred_produce: 'Apples, Carrots, Potatoes',
        preference: 'Looking for Grade A organic produce',
      },
      {
        name: 'Coastline Grocers',
        company_type: 'grocery',
        location: 'Seattle, WA',
        distance_miles: 28,
        preferred_produce: 'Strawberries, Broccoli, Peppers',
        preference: 'Weekly recurring bulk orders',
      },
      {
        name: 'PrairieFresh Wholesale',
        company_type: 'wholesaler',
        location: 'Winnipeg, MB',
        distance_miles: 85,
        preferred_produce: 'Potatoes, Onions',
        preference: 'Cold storage facilities available immediately',
      },
      {
        name: 'Sonoma Grocery Co-op',
        company_type: 'grocery',
        location: 'Santa Rosa, CA',
        distance_miles: 18,
        preferred_produce: 'Tomatoes, Peppers, Lettuce',
        preference: 'Immediate local redistribution channel',
      },
    ]

    for (const b of buyersData) {
      try {
        app.findFirstRecordByData('buyers', 'name', b.name)
      } catch (_) {
        const buyerRec = new Record(buyersCol)
        buyerRec.set('name', b.name)
        buyerRec.set('company_type', b.company_type)
        buyerRec.set('location', b.location)
        buyerRec.set('distance_miles', b.distance_miles)
        buyerRec.set('preferred_produce', b.preferred_produce)
        buyerRec.set('preference', b.preference)
        app.save(buyerRec)
      }
    }

    // Seed sample demo batches & actions
    const batchesCol = app.findCollectionByNameOrId('batches')
    const actionsCol = app.findCollectionByNameOrId('actions')

    const sampleBatches = [
      {
        produce_type: 'Strawberries',
        quantity: 250,
        unit: 'crates',
        harvest_date: new Date(Date.now() - 86400000).toISOString(),
        location: 'Fresno, CA',
        status: 'at_risk',
        risk_score: 87,
        demand_score: 42,
        time_before_loss_days: 2,
        ai_explanation:
          'Elevated ambient temperature during transit corridor. Local market velocity is low.',
        action_type: 'redirect',
        action_rationale:
          'Redirect to Sonoma Grocery Co-op to protect 85% expected revenue before spoilage.',
      },
      {
        produce_type: 'Organic Tomatoes',
        quantity: 1200,
        unit: 'lbs',
        harvest_date: new Date().toISOString(),
        location: 'Salinas, CA',
        status: 'active',
        risk_score: 24,
        demand_score: 91,
        time_before_loss_days: 7,
        ai_explanation: 'Strong regional buyer interest and optimal harvest moisture level.',
        action_type: 'sell_now',
        action_rationale: 'Sell immediately to GreenHarvest Distributors at peak market rate.',
      },
      {
        produce_type: 'Romaine Lettuce',
        quantity: 500,
        unit: 'crates',
        harvest_date: new Date(Date.now() - 172800000).toISOString(),
        location: 'Ontario, CA',
        status: 'at_risk',
        risk_score: 68,
        demand_score: 58,
        time_before_loss_days: 3,
        ai_explanation:
          'Regional supply surplus creating demand bottleneck. Spoilage window in 72 hours.',
        action_type: 'discount',
        action_rationale: 'Apply 15% discount for fast 24-hour local pickup.',
      },
    ]

    for (const item of sampleBatches) {
      try {
        app.findFirstRecordByData('batches', 'produce_type', item.produce_type)
      } catch (_) {
        const batchRec = new Record(batchesCol)
        batchRec.set('owner', userId)
        batchRec.set('produce_type', item.produce_type)
        batchRec.set('quantity', item.quantity)
        batchRec.set('unit', item.unit)
        batchRec.set('harvest_date', item.harvest_date)
        batchRec.set('location', item.location)
        batchRec.set('status', item.status)
        batchRec.set('risk_score', item.risk_score)
        batchRec.set('demand_score', item.demand_score)
        batchRec.set('time_before_loss_days', item.time_before_loss_days)
        batchRec.set('ai_explanation', item.ai_explanation)
        app.save(batchRec)

        const actionRec = new Record(actionsCol)
        actionRec.set('batch', batchRec.id)
        actionRec.set('owner', userId)
        actionRec.set('type', item.action_type)
        actionRec.set('status', 'suggested')
        actionRec.set('rationale', item.action_rationale)
        app.save(actionRec)
      }
    }
  },
  (app) => {},
)
