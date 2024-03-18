using Tasks.Services;

public class TokenExpirationMiddleware
{
    private readonly RequestDelegate _next;

    public TokenExpirationMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public object JwtTokenValidator { get; private set; }

    public async Task Invoke(HttpContext context)
    {
        var token = context.Request.Cookies["your_token_cookie_name"];

        if (!string.IsNullOrEmpty(token))
        {
            if (TasksTokenService.IsTokenExpired(token))
            {
                context.Response.Redirect("/login");
                return;
            }
            // הטוקן תקף, אז אפשר להמשיך לטעינת הדף הראשי
        }

        await _next(context);
    }
}
