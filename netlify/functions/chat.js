Zabardast! `netlify/functions/chat.js` bilkul sahi bana! 🎉

Ab neeche **"Enter file contents here"** wali jagah tap karein aur yeh code paste karein:

```javascript
exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  try {
    const { messages } = JSON.parse(event.body);
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01',
        'x-api-key': process.env.ANTHROPIC_API_KEY
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 300,
        system: `You are a helpful assistant for Biryani House Karachi. Reply in Urdu/Roman Urdu. Keep replies short (2-3 lines). Menu: Chicken Biryani Full Rs.950, Half Rs.550. Mutton Biryani Full Rs.1400. Beef Biryani Full Rs.1100. Prawn Biryani Full Rs.1600. Raita Rs.80. Hours: 12pm-11pm. Location: Block 7 Clifton Karachi. Phone: 021-3456-7890. Delivery available.`,
        messages: messages
      })
    });
    const data = await response.json();
    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ reply: data.content[0].text })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ reply: 'Maafi, dobara try karein.' })
    };
  }
};
```

Paste karne ke baad **"Commit changes"** green button tap karein!
