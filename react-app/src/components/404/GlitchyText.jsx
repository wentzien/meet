import styled from "styled-components";

const GLITCH_CHARS = '`¡™£¢∞§¶•ªº–≠åß∂ƒ©˙∆˚¬…æ≈ç√∫˜µ≤≥÷/?░▒▓<>/'.split('');

const ReadableChar = styled.span``;

const GlitchyChar = styled.span``;

const GlitchyText = ({children, ...props}) => {
    return (
        <h1 {...props} className={`glitchy-text ${props.className}`}>
            <ReadableChar className="glitchy-text__char--readable">
                {children}
            </ReadableChar>
            {children.split('').map((char, idx) => {
                const charStyle = {
                    '--count': Math.random() * 5 + 1,
                }
                for (let i = 0; i < 10; i++) {
                    charStyle[`--char-${i}`] = `"${
                        GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
                    }"`
                }
                return (
                    <GlitchyChar
                        className="glitchy-text__char"
                        aria-hidden={true}
                        data-char={char}
                        key={`glitch-char--${idx}`}
                        style={charStyle}>
                        {char}
                    </GlitchyChar>
                )
            })}
        </h1>
    )
}

export default GlitchyText;