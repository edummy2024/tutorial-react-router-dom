import { themes } from "prism-react-renderer";
import { CodeBlock } from "react-code-block";
import { useCopyToClipboard } from 'react-use';

function CodeBlockComponent({ code, language }) {
  const [state, copyToClipboard] = useCopyToClipboard();
  console.log({ state })
  function copyCode() {
    copyToClipboard(code);
  }

  return (
    <CodeBlock code={code} language={language} theme={themes.nightOwlLight}>
      <CodeBlock.Code style={{
        // background: 'black',
        padding: 10,
        borderRadius: 10,
      }}>
        <CodeBlock.LineContent>
          <CodeBlock.Token />
        </CodeBlock.LineContent>
      </CodeBlock.Code>

      <button onClick={copyCode}>
        {
          state.value ? 'copied': 'copy code'
        }
      </button>
    </CodeBlock>
  )
}

export default function CodeBlockPage() {
  const code = `function sum(a, b) {
    return a + b;
  }`;
  const language = 'js';

  return <CodeBlockComponent code={code} language={language} />
}