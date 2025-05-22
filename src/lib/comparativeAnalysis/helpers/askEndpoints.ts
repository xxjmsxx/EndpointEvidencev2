// import { openai } from '@ai-sdk/openai';
// import { generateObject, streamText } from 'ai';
// import { CmpState } from '@/types/comparativeAnalysisSchema';
// import { Message } from '@/types/message';
// import { sanitizeHeaderValue } from '@/utils/querySanitizer';

// /**
//  *  askEndpoints — first helper in the flow
//  *
//  *  • If endpoints are already in state → skip ahead to chemo clarifier
//  *  • Otherwise:
//  *      1. Try to interpret the last user message as an endpoint choice
//  *      2. If we can’t, ask a one‑sentence question
//  */
// export async function askEndpoints(
//   msgs: Message[],
//   st: CmpState
// ): Promise<Response> {
//   const last = msgs[msgs.length - 1];

//   // -------------------------------------------------------------
//   // 0.  Bail early if we already know endpoints
//   // -------------------------------------------------------------
//   if (st.endpoints && st.endpoints.length > 0) {
//     st.stage = 'clarifyChemo';
//     const res = new Response(null, { status: 200 });
//     marshalHeaders(res, st);
//     return res;
//   }

//   // -------------------------------------------------------------
//   // 1.  Attempt to parse the user’s last reply as an endpoint list
//   // -------------------------------------------------------------
//   if (last.role === 'user') {
//     try {
//       const { object } = await generateObject({
//         model: openai('gpt-4o-mini'),
//         schema: {
//           type: 'object',
//           properties: {
//             endpoints: {
//               type: 'array',
//               items: { enum: ['OS', 'PFS', 'ORR', 'QoL'] },
//             },
//           },
//           required: ['endpoints'],
//         } as const,
//         system:
//           'You extract which clinical endpoints the user mentions. ' +
//           'Valid values: OS, PFS, ORR, QoL. Respond with JSON only.',
//         prompt: last.content,
//       });

//       if (object.endpoints?.length) {
//         st.endpoints = object.endpoints;
//         st.stage = 'clarifyChemo';

//         const txt = `Got it — we’ll analyse **${object.endpoints.join(
//           ', '
//         )}**.`;
//         const res = new Response(txt, { status: 200 });
//         marshalHeaders(res, st);
//         return res;
//       }
//     } catch (err) {
//       /* silent – fall through to ask */
//     }
//   }

//   // -------------------------------------------------------------
//   // 2.  Still missing → ask the clarifying question
//   // -------------------------------------------------------------
//   st.stage = 'clarifyEndpoints'; // stay in this stage until answered

//   const ask = await streamText({
//     model: openai('gpt-4o'),
//     system:
//       `You are a clinical research assistant.\n` +
//       `RULES:\n- Ask ONLY about endpoints.\n` +
//       `- One sentence max.\n- Say nothing about “PICOT” or JSON.`,
//     messages: msgs,
//     prompt:
//       'Which clinical endpoints should we compare? ' +
//       'Options include overall survival (OS), progression‑free survival (PFS), ' +
//       'objective response rate (ORR), or quality‑of‑life (QoL).',
//   });

//   const res = ask.toDataStreamResponse();
//   marshalHeaders(res, st);
//   return res;
// }

// /* -------------------------------------------------------------
//    marshalHeaders helper (already used elsewhere in your code)
// ------------------------------------------------------------- */
// function marshalHeaders(res: Response, st: CmpState) {
//   res.headers.set(
//     'X-Cmp-State',
//     sanitizeHeaderValue(JSON.stringify(st))
//   );
//   res.headers.set('X-Stage', st.stage);
// }
