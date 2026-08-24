from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import MarianMTModel, MarianTokenizer

MODEL_NAME = "Helsinki-NLP/opus-mt-de-es"

print("Cargando modelo...")

tokenizer = MarianTokenizer.from_pretrained(MODEL_NAME)
model = MarianMTModel.from_pretrained(MODEL_NAME)

print("Modelo listo.")

app = FastAPI(title="Streaming Dual Subs Translator")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # Lo restringiremos más adelante
    allow_methods=["*"],
    allow_headers=["*"],
)


class TranslationRequest(BaseModel):
    text: str


class TranslationResponse(BaseModel):
    translation: str


@app.post("/translate", response_model=TranslationResponse)
def translate(request: TranslationRequest):
    inputs = tokenizer(request.text, return_tensors="pt")
    translated = model.generate(**inputs)

    result = tokenizer.decode(
        translated[0],
        skip_special_tokens=True
    )

    return TranslationResponse(translation=result)

@app.get("/health")
def health():
    return {"status": "ok"}