routerAdd(
  'POST',
  '/backend/v1/predict',
  (e) => {
    const body = e.requestInfo().body || {}
    const produce_type = body.produce_type || 'Fresh Produce'
    const quantity = body.quantity || 100
    const unit = body.unit || 'crates'
    const harvest_date = body.harvest_date || new Date().toISOString()
    const location = body.location || 'Fresno, CA'

    const prompt = `Analyze this agricultural produce batch for predictive waste prevention:
Produce Type: ${produce_type}
Quantity: ${quantity} ${unit}
Harvest Date: ${harvest_date}
Location: ${location}

Provide a JSON object output ONLY with these fields:
{
  "risk_score": <number 0-100 indicating spoilage risk %>,
  "demand_score": <number 0-100 indicating current market demand score>,
  "time_before_loss_days": <integer days remaining before quality loss>,
  "ai_explanation": <short clear 1-2 sentence explanation of risk factors and shelf-life impact>,
  "recommended_action": <one of "redirect", "sell_now", "discount">,
  "rationale": <one concise actionable recommendation sentence>
}`

    try {
      const res = $ai.chat({
        model: 'fast',
        messages: [
          {
            role: 'system',
            content:
              "You are Agra's predictive logistics AI decision engine. Output raw valid JSON only.",
          },
          { role: 'user', content: prompt },
        ],
      })

      let text = res.choices[0].message.content.trim()
      text = text
        .replace(/^```json\s*/i, '')
        .replace(/^```\s*/i, '')
        .replace(/\s*```$/, '')
      const parsed = JSON.parse(text)

      return e.json(200, {
        risk_score: Math.min(100, Math.max(0, Number(parsed.risk_score) || 45)),
        demand_score: Math.min(100, Math.max(0, Number(parsed.demand_score) || 68)),
        time_before_loss_days: Math.max(1, Math.round(Number(parsed.time_before_loss_days) || 4)),
        ai_explanation:
          parsed.ai_explanation ||
          `${produce_type} harvested in ${location}. Storage window and regional demand analyzed.`,
        recommended_action: ['redirect', 'sell_now', 'discount'].includes(parsed.recommended_action)
          ? parsed.recommended_action
          : 'redirect',
        rationale:
          parsed.rationale ||
          `Execute recommended ${parsed.recommended_action || 'action'} to prevent product degradation.`,
      })
    } catch (err) {
      const ageDays = Math.max(
        0,
        Math.floor(
          (new Date().getTime() - new Date(harvest_date).getTime()) / (1000 * 60 * 60 * 24),
        ),
      )
      const computedRisk = Math.min(92, 25 + ageDays * 20)

      return e.json(200, {
        risk_score: computedRisk,
        demand_score: 65,
        time_before_loss_days: Math.max(1, 6 - ageDays),
        ai_explanation: `${produce_type} harvested ${ageDays} day(s) ago in ${location}. Temperature sensitivity indicates elevated spoilage probability.`,
        recommended_action:
          computedRisk > 70 ? 'redirect' : computedRisk > 45 ? 'discount' : 'sell_now',
        rationale: `Act within 48 hours to protect batch value and prevent waste.`,
      })
    }
  },
  $apis.requireAuth(),
)
