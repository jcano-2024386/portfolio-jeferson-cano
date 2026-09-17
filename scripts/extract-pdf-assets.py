import fitz
import os

outs = r"public/work/pdf-extract"
os.makedirs(outs, exist_ok=True)
pdfs = [
    r"C:\Users\jef3r\Downloads\ECOBUILD-Guia-de-Marca.pdf",
    r"C:\Users\jef3r\Downloads\ECOBUILD idea de brandingg.pdf",
    r"C:\Users\jef3r\Downloads\Buildaton SDLC 2026 - Plantillas ECOBUILD LLENO.pdf",
]
idx = 0
for pdf in pdfs:
    if not os.path.exists(pdf):
        print("missing", pdf)
        continue
    doc = fitz.open(pdf)
    for i, page in enumerate(doc):
        if i > 4:
            break
        pix = page.get_pixmap(matrix=fitz.Matrix(1.6, 1.6))
        path = os.path.join(outs, f"page-{idx}.png")
        pix.save(path)
        print("page", path, pix.width, pix.height)
        idx += 1
    for page in doc:
        for img in page.get_images(full=True):
            xref = img[0]
            try:
                pix = fitz.Pixmap(doc, xref)
                if pix.n >= 5:
                    pix = fitz.Pixmap(fitz.csRGB, pix)
                if pix.width < 240:
                    continue
                path = os.path.join(outs, f"emb-{idx}.png")
                pix.save(path)
                print("emb", path, pix.width)
                idx += 1
            except Exception:
                pass
print("done", idx)
