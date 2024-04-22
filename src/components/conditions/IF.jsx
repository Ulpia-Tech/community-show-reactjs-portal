export const IF = (props) => {

    if(props.condition) {
        return <div>{props.children}</div>
    }
};