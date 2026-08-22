from transformers import MarianMTModel, MarianTokenizer

MODEL_NAME = "Helsinki-NLP/opus-mt-de-es"

print("Cargando modelo...")

tokenizer = MarianTokenizer.from_pretrained(MODEL_NAME)
model = MarianMTModel.from_pretrained(MODEL_NAME)

text = "Dieser potenzielle Kunde."

inputs = tokenizer(text, return_tensors="pt")

translated = model.generate(**inputs)

result = tokenizer.decode(translated[0], skip_special_tokens=True)

print(f"Original: {text}")
print(f"Traducción: {result}")