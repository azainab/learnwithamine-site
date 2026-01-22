@app.post("/chat")
async def chat(request: ChatRequest):
    # LLM response + YouTube embed
    return {"response": process_message(request.message)}