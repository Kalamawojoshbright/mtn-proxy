// Cloudflare Worker Proxy
export default {
  async fetch(request, env) {
    // Configuration - EDIT THESE!
    const TARGET_HOST = "your-heroku-app.herokuapp.com"; // CHANGE ME
    const PATH_PREFIX = "/mtn-ug"; // CHANGE IF BLOCKED
    
    const url = new URL(request.url);
    
    // Only handle specific path
    if (!url.pathname.startsWith(PATH_PREFIX)) {
      return new Response("Not found", { status: 404 });
    }
    
    // Rewrite to target host
    url.hostname = TARGET_HOST;
    
    // Clone headers
    const headers = new Headers(request.headers);
    headers.set('Host', TARGET_HOST);
    headers.set('X-Forwarded-For', request.headers.get('CF-Connecting-IP'));
    
    return fetch(url, {
      headers,
      method: request.method,
      body: request.body
    });
  }
}
