const A = (props) => {
    return <a href={props.href}
              rel={'noreferrer'}
              target={'_blank'}
    >{props.children}</a>
}

export default A;