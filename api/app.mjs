import { nanoid } from 'nanoid';
import express from 'express';
import { createClient } from '@supabase/supabase-js';

const app = express();
const port = 3000;

const site = process.env.SITE_NAME;

let supabase;

function getSupabase() {
  if (!supabase) {
    supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
  }
  return supabase;
}

app.use(express.static('public'), express.json());

function validUrl(url) {
  return true;
}

async function getOldUrl(req, res, code) {
  const { data, error } = await getSupabase()
    .from('links')
    .select('original_url')
    .eq('code', code)
    .single();
  
  if (error || !data) {
    console.log("doesn't exist");
    return null;
  }
  return data.original_url;
}

async function insertCode(url, res) {
  var code = nanoid(6);
  const { data, error } = await getSupabase()
    .from('links')
    .select('code')
    .eq('code', code)
    .single();

  if (error || !data) {
    const { error: insertError } = await getSupabase()
      .from('links')
      .insert({ code: code, original_url: url });
    
    if (!insertError) {
      console.log(code);
      res.json({ short_code: code });
    }
  } else {
    insertCode(url, res);
  }
}

app.get('/:code', async (req, res) => {
  const myCode = req.params.code;
  var url = await getOldUrl(req, res, myCode);
  if (url) {
    res.redirect(url);
  } else {
    res.status(404).send('Link not found');
  }
});

app.post('/api/shorten', async (req, res) => {
  console.log('backend received:', req.body);
  var url = req.body.long_url;
  if (validUrl(url)) {
    await insertCode(url, res);
  }
});

export default app;