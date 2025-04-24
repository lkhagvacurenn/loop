export function LoginPage() {
    return(`
      <section class="login-section">
        <h2>Login</h2>
        <form id="login-form" class="login-form">
          <input type="text" id="username" placeholder="Username" required />
          <input type="password" id="password" placeholder="Password" required />
          <button type="submit">Log In</button>
        </form>
      </section>
    `)
  }
  