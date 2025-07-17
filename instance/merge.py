import sqlite3

# Base source (celle à copier)
conn_source = sqlite3.connect('test.db')
cursor_source = conn_source.cursor()

# Base cible (celle dans laquelle tu veux tout fusionner)
conn_target = sqlite3.connect('mikolo_maitso.db')
cursor_target = conn_target.cursor()

# Lire les données depuis la base source
cursor_source.execute("SELECT * FROM plant")
rows = cursor_source.fetchall()

# Insérer dans la base cible
for row in rows:
    try:
        cursor_target.execute("INSERT INTO plant VALUES (?, ?, ?, ?, ?,? ,?,?)", row)
    except sqlite3.IntegrityError:
        print(f"⚠️ Conflit sur id={row[0]}, insertion ignorée.")  # tu peux aussi gérer ça avec INSERT OR IGNORE

conn_target.commit()
cursor_source.close()
cursor_target.close()
