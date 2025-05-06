namespace TodoApi;
public class TodoItem
{
    public int      Id          { get; set; }
    public string   Title       { get; set; } = string.Empty;
    public string   Description { get; set; } = string.Empty;
    public DateTime DueDate     { get; set; }
    public bool     Completed   { get; set; }
    public string   List        { get; set; } = string.Empty;

    public string   Owner       { get; set; } = string.Empty;
}
