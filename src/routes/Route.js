import { Route, redirect } from 'react-router-dom'

export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}) {

  const loading = false;
  const signed = true;

  if (loading) {
    return (
      <div>Olá Mundo</div>
    )
  }

  //se n estiver logado e tentou acessar uma págiana privada 
  // é redirecionado pro login
  // if (!signed && isPrivate) {
  //   return redirect("/login")
  // }

  //está logado e tentou acessar uma rota n privada, vai pro dashboard
  // if (signed && !isPrivate) {
  //   return redirect("/")
  // }


  return (
    <Route {...rest} render={props => (<Component {...props} />)} />
  )
}
