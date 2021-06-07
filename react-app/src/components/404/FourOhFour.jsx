import {useEffect} from "react";
import GlitchyText from "./GlitchyText";
import Logo from "./Logo";
import styled from "styled-components";

const Container = styled.div`
  display: inline-grid;
  grid-gap: 0 1rem;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto;
`

const Code = styled(GlitchyText)`
  align-self: end;
  font-size: 3rem;
  @media (min-width: 768px) {
    font-size: 6rem;
  }
`

const AppShell = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
`

const CodeMessage = styled(GlitchyText)`
  font-size: 1.5rem;

  @media (min-width: 768px) {
    font-size: 3rem;
  }
`

const Message = styled.a`
  grid-column: span 2;
  grid-row: -1;
  text-align: center;
  margin: 2rem auto;

  &:hover {
    & ~ img {
      background: red;
    }
  }
`

const FourOhFour = () => {
    useEffect(() => {
        const root = document.documentElement
        const update = e => {
            if (e.acceleration && e.acceleration.x !== null) {
                root.style.setProperty('--X', e.acceleration.x)
                root.style.setProperty('--Y', e.acceleration.y)
            } else {
                root.style.setProperty('--X', e.pageX / window.innerWidth - 0.5)
                root.style.setProperty('--Y', e.pageY / window.innerHeight - 0.5)
            }
        }

        document.body.addEventListener('mousemove', update)
        window.ondevicemotion = update
        return () => {
            document.body.removeEventListener('mousemove', update)
        }
    }, [])
    return (
        <AppShell>
            <Container>
                <Message className="return-link" href="/#" rel="noreferrer noopener">
                    Return to happiness
                </Message>
                <Logo className="bear-logo--tears"/>
                <Code className="four-oh-four__code">404</Code>
                <CodeMessage className="four-oh-four__code-message">
                    Not found
                </CodeMessage>
            </Container>
        </AppShell>
    )
}

export default FourOhFour;