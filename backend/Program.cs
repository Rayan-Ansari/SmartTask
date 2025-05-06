using TodoApi;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddCors(policy =>
{
    policy.AddDefaultPolicy(p =>
        p.AllowAnyOrigin()
         .AllowAnyMethod()
         .AllowAnyHeader());
});

var app = builder.Build();
app.UseCors();


var todoItems = new List<TodoItem>
{
    
    new() { Id= 1,  Title="Learn C#", Description="Learn C#/.NET2",        DueDate=DateTime.Now.AddDays(1),  Completed=false, List="Personal", Owner="kramer@seinfeld.com" },
    new() { Id= 2,  Title="Build a Web API", Description="ASP.NET Core",   DueDate=DateTime.Now.AddDays(2),  Completed=false, List="Work",     Owner="kramer@seinfeld.com" },
    new() { Id= 3,  Title="Build SPA", Description="React front‑end",      DueDate=DateTime.Now.AddDays(3),  Completed=false, List="Work",     Owner="kramer@seinfeld.com" },
    new() { Id= 4,  Title="Setup CI/CD", Description="Azure DevOps",       DueDate=DateTime.Now.AddDays(4),  Completed=false, List="Work",     Owner="kramer@seinfeld.com" },
    new() { Id= 5,  Title="Write Unit Tests", Description="API coverage",  DueDate=DateTime.Now.AddDays(5),  Completed=false, List="Work",     Owner="kramer@seinfeld.com" },
    new() { Id= 6,  Title="Code Review", Description="Review PRs",         DueDate=DateTime.Now.AddDays(6),  Completed=true,  List="Work",     Owner="kramer@seinfeld.com" },
    new() { Id= 7,  Title="Prepare Interview", Description="Algo prep",    DueDate=DateTime.Now.AddDays(7),  Completed=false, List="Personal", Owner="kramer@seinfeld.com" },
    new() { Id= 8,  Title="Take a Break", Description="Weekend trip",      DueDate=DateTime.Now.AddDays(8),  Completed=false, List="Personal", Owner="kramer@seinfeld.com" },
    new() { Id= 9,  Title="Review Docs", Description="Accuracy pass",      DueDate=DateTime.Now.AddDays(1),  Completed=false, List="Work",     Owner="kramer@seinfeld.com" },
    new() { Id=10,  Title="DB Maintenance", Description="Re‑index tables", DueDate=DateTime.Now.AddDays(3),  Completed=true,  List="Work",     Owner="kramer@seinfeld.com" },
    new() { Id=11,  Title="Update Deps", Description="NuGet / NPM",        DueDate=DateTime.Now.AddDays(5),  Completed=false, List="Work",     Owner="kramer@seinfeld.com" },
    new() { Id=12,  Title="Full Backup", Description="System backup",      DueDate=DateTime.Now.AddDays(8),  Completed=false, List="Work",     Owner="kramer@seinfeld.com" },

    
    new() { Id=13,  Title="Learn TypeScript", Description="TS deep‑dive",  DueDate=DateTime.Now.AddDays(10), Completed=false, List="Personal", Owner="bodonnell@gmail.com" },
    new() { Id=14,  Title="Deploy App", Description="Deploy to prod",      DueDate=DateTime.Now.AddDays(12), Completed=false, List="Work",     Owner="bodonnell@gmail.com" },
    new() { Id=15,  Title="DB Optimisation", Description="Query tuning",   DueDate=DateTime.Now.AddDays(14), Completed=false, List="Work",     Owner="bodonnell@gmail.com" },
    new() { Id=16,  Title="Security Audit", Description="OWASP review",    DueDate=DateTime.Now.AddDays(15), Completed=true,  List="Work",     Owner="bodonnell@gmail.com" },
    new() { Id=17,  Title="Read Clean Code", Description="Book club",      DueDate=DateTime.Now.AddDays(20), Completed=false, List="Personal", Owner="bodonnell@gmail.com" },
    new() { Id=18,  Title="Add JWT Auth", Description="Secure API",        DueDate=DateTime.Now.AddDays(7),  Completed=false, List="Work",     Owner="bodonnell@gmail.com" },
    new() { Id=19,  Title="Write Swagger Docs", Description="OpenAPI",     DueDate=DateTime.Now.AddDays(9),  Completed=false, List="Work",     Owner="bodonnell@gmail.com" },
    new() { Id=20,  Title="Exercise 5 k", Description="Morning run",       DueDate=DateTime.Now.AddDays(1),  Completed=true,  List="Health",   Owner="bodonnell@gmail.com" },
    new() { Id=21,  Title="Learn Docker", Description="Containers 101",    DueDate=DateTime.Now.AddDays(2),  Completed=false, List="Education",Owner="bodonnell@gmail.com" },
    new() { Id=22,  Title="Watch Conference", Description="Talk videos",   DueDate=DateTime.Now.AddDays(4),  Completed=false, List="Education",Owner="bodonnell@gmail.com" },
    new() { Id=23,  Title="Cook New Recipe", Description="Pasta night",    DueDate=DateTime.Now.AddDays(6),  Completed=false, List="Personal", Owner="bodonnell@gmail.com" },
    new() { Id=24,  Title="Car Maintenance", Description="Oil change",     DueDate=DateTime.Now.AddDays(9),  Completed=false, List="Personal", Owner="bodonnell@gmail.com" },

    
    new() { Id=25,  Title="Fix Critical Bug", Description="Prod login",    DueDate=DateTime.Now.AddDays(1),  Completed=false, List="Work",     Owner="test@example.com" },
    new() { Id=26,  Title="Attend Meetup", Description="Micro‑services",   DueDate=DateTime.Now.AddDays(7),  Completed=false, List="Personal", Owner="test@example.com" },
    new() { Id=27,  Title="Update Résumé", Description="Add projects",     DueDate=DateTime.Now.AddDays(14), Completed=false, List="Personal", Owner="test@example.com" },
    new() { Id=28,  Title="Research Cloud", Description="AWS vs Azure",    DueDate=DateTime.Now.AddDays(5),  Completed=true,  List="Work",     Owner="test@example.com" },
    new() { Id=29,  Title="Meditate", Description="Mindfulness 15 min",    DueDate=DateTime.Now.AddDays(10), Completed=false, List="Health",   Owner="test@example.com" },
    new() { Id=30,  Title="Performance Tests", Description="Load testing", DueDate=DateTime.Now.AddDays(3),  Completed=false, List="Work",     Owner="test@example.com" },
    new() { Id=31,  Title="Client Meeting", Description="Stakeholder sync",DueDate=DateTime.Now.AddDays(2),  Completed=false, List="Work",     Owner="test@example.com" },
    new() { Id=32,  Title="Budget Planning", Description="Q3 Tech budget", DueDate=DateTime.Now.AddDays(8),  Completed=true,  List="Work",     Owner="test@example.com" },
    new() { Id=33,  Title="Doctor Appointment",Description="Annual physical",DueDate=DateTime.Now.AddDays(3),Completed=false, List="Health",   Owner="test@example.com" },
    new() { Id=34,  Title="Family Dinner", Description="Sunday dinner",    DueDate=DateTime.Now.AddDays(7),  Completed=false, List="Personal", Owner="test@example.com" },
    new() { Id=35,  Title="Home Repairs", Description="Fix bathroom tap",  DueDate=DateTime.Now.AddDays(11), Completed=false, List="Personal", Owner="test@example.com" },
    new() { Id=36,  Title="Learn Spanish", Description="Duo lesson",       DueDate=DateTime.Now.AddDays(12), Completed=true,  List="Education",Owner="test@example.com" }
};


var api = app.MapGroup("/api");


api.MapGet("/todos", (string? list) =>
{
    var q = todoItems.AsEnumerable();
    if (!string.IsNullOrWhiteSpace(list))
        q = q.Where(t => t.List.Equals(list, StringComparison.OrdinalIgnoreCase));

    return Results.Ok(q);
});


api.MapGet("/todos/user/{owner}", (string owner, string? list) =>
{
    var q = todoItems.Where(t =>
        t.Owner.Equals(owner, StringComparison.OrdinalIgnoreCase));

    if (!string.IsNullOrWhiteSpace(list))
        q = q.Where(t => t.List.Equals(list, StringComparison.OrdinalIgnoreCase));

    return Results.Ok(q);
});


api.MapGet("/todos/{id:int}", (int id) =>
    todoItems.FirstOrDefault(t => t.Id == id) is { } t
        ? Results.Ok(t)
        : Results.NotFound());


api.MapPost("/todos", (TodoItem newItem) =>
{
    newItem.Id = todoItems.Max(t => t.Id) + 1;
    todoItems.Add(newItem);
    return Results.Created($"/api/todos/{newItem.Id}", newItem);
});


api.MapPut("/todos/{id:int}", (int id, TodoItem updated) =>
{
    var idx = todoItems.FindIndex(t => t.Id == id);
    if (idx == -1) return Results.NotFound();

    updated.Id = id;            
    todoItems[idx] = updated;   
    return Results.Ok(updated);
});


api.MapDelete("/todos/{id:int}", (int id) =>
    todoItems.RemoveAll(t => t.Id == id) > 0
        ? Results.NoContent()
        : Results.NotFound());

app.Run();
