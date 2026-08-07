migrate(
  (app) => {
    const usersId = '_pb_users_auth_'

    const batches = new Collection({
      name: 'batches',
      type: 'base',
      listRule: "@request.auth.id != '' && owner = @request.auth.id",
      viewRule: "@request.auth.id != '' && owner = @request.auth.id",
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != '' && owner = @request.auth.id",
      deleteRule: "@request.auth.id != '' && owner = @request.auth.id",
      fields: [
        {
          name: 'owner',
          type: 'relation',
          required: true,
          collectionId: usersId,
          cascadeDelete: false,
          maxSelect: 1,
        },
        { name: 'produce_type', type: 'text', required: true },
        { name: 'quantity', type: 'number', required: true },
        { name: 'unit', type: 'text', required: true },
        { name: 'harvest_date', type: 'date', required: true },
        { name: 'location', type: 'text', required: true },
        { name: 'status', type: 'text', required: true },
        { name: 'risk_score', type: 'number', required: true },
        { name: 'demand_score', type: 'number', required: true },
        { name: 'time_before_loss_days', type: 'number', required: true },
        { name: 'ai_explanation', type: 'text' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: [
        'CREATE INDEX idx_batches_owner ON batches (owner)',
        'CREATE INDEX idx_batches_produce ON batches (produce_type)',
        'CREATE INDEX idx_batches_location ON batches (location)',
        'CREATE INDEX idx_batches_status ON batches (status)',
        'CREATE INDEX idx_batches_risk ON batches (risk_score)',
      ],
    })
    app.save(batches)

    const batchesId = app.findCollectionByNameOrId('batches').id

    const actions = new Collection({
      name: 'actions',
      type: 'base',
      listRule: "@request.auth.id != '' && owner = @request.auth.id",
      viewRule: "@request.auth.id != '' && owner = @request.auth.id",
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != '' && owner = @request.auth.id",
      deleteRule: "@request.auth.id != '' && owner = @request.auth.id",
      fields: [
        {
          name: 'batch',
          type: 'relation',
          required: true,
          collectionId: batchesId,
          cascadeDelete: true,
          maxSelect: 1,
        },
        {
          name: 'owner',
          type: 'relation',
          required: true,
          collectionId: usersId,
          cascadeDelete: false,
          maxSelect: 1,
        },
        { name: 'type', type: 'text', required: true },
        { name: 'status', type: 'text', required: true },
        { name: 'rationale', type: 'text' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: [
        'CREATE INDEX idx_actions_batch ON actions (batch)',
        'CREATE INDEX idx_actions_owner ON actions (owner)',
        'CREATE INDEX idx_actions_type ON actions (type)',
        'CREATE INDEX idx_actions_status ON actions (status)',
      ],
    })
    app.save(actions)

    const buyers = new Collection({
      name: 'buyers',
      type: 'base',
      listRule: "@request.auth.id != ''",
      viewRule: "@request.auth.id != ''",
      createRule: null,
      updateRule: null,
      deleteRule: null,
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'company_type', type: 'text', required: true },
        { name: 'location', type: 'text', required: true },
        { name: 'distance_miles', type: 'number', required: true },
        { name: 'preferred_produce', type: 'text' },
        { name: 'preference', type: 'text' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: ['CREATE INDEX idx_buyers_location ON buyers (location)'],
    })
    app.save(buyers)
  },
  (app) => {
    try {
      app.delete(app.findCollectionByNameOrId('buyers'))
    } catch (_) {}
    try {
      app.delete(app.findCollectionByNameOrId('actions'))
    } catch (_) {}
    try {
      app.delete(app.findCollectionByNameOrId('batches'))
    } catch (_) {}
  },
)
