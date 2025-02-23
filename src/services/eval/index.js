import { safeEval } from './parser.js';

/**
 *
 * @param {import('telegraf').Context} context
 */
async function evalCommand(context) {
  const {
    message: { text },
  } = context;

  let source;
  if (text.startsWith('/eval ')) {
    source = text.substring(6);
  } else if (text.startsWith(`/eval@${context.me} `)) {
    source = text.substring(7 + context.me.length);
  } else if (text.startsWith('```') && text.endsWith('```')) {
    source = text.substring(3, text.length - 4);
  } else {
    return;
  }

  const output = safeEval(source);

  await context.replyWithMarkdown(`
Code:
\`\`\`
${source}
\`\`\`

Output:
\`\`\`
${output}
\`\`\`
  `);
}

/**
 * Evaluate javascript expression.
 * @param {import('telegraf').Telegraf} bot
 */
export function register(bot) {
  bot.command('eval', evalCommand);

  return [
    {
      command: 'eval',
      description: 'Evaluate javascript expression.',
    },
  ];
}
