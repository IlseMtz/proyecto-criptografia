import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cifrador',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './cifrador.html',
  styleUrl: './cifrador.css',
})
export class Cifrador {
  // [A]
  presets = {
    'ascii': " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|°¬}~áéíóúÁÉÍÓÚñÑüÜ¿¡",
    'minusculas': "abcdefghijklmnopqrstuvwxyz",
    'mayusculas': "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    'hexadecimal': "0123456789ABCDEF",
    'alfanumerico': "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  };

  presetSeleccionado: string = 'ascii';
  alphabet: string = this.presets['ascii'];
  
  // [C]
  metodoCifrado: 'cesar' | 'atbash' = 'cesar';
  action: 'cifrar' | 'descifrar' = 'cifrar';
  shift: number = 3; 
  inputText: string = '';
  copiadoExitoso: boolean = false;

  // [A1]
  onPresetChange() {
    if (this.presetSeleccionado === 'personalizado') {
      // Si eligen personalizado, limpiamos el abecedario para que escriban desde cero
      this.alphabet = ''; 
    } else {
      // Si eligen una opción predefinida, cargamos el diccionario
      this.alphabet = this.presets[this.presetSeleccionado as keyof typeof this.presets];
    }
    this.limpiarTexto(); // Limpiamos el texto inmediatamente
  }

  // NUEVA FUNCIÓN: Se ejecuta cada vez que el usuario teclea algo en su abecedario personalizado
  onCustomAlphabetChange() {
    // Volvemos a limpiar el texto de entrada por si el usuario borró una letra de su abecedario
    this.limpiarTexto();
  }
  // [B]
  limpiarTexto() {// Filtra el texto de entrada
    if (!this.inputText) return;
    
    let textoValido = '';
    for (let i = 0; i < this.inputText.length; i++) {
      const char = this.inputText[i];
      // Si el carácter existe en nuestro abecedario actual, lo conservamos
      if (this.alphabet.includes(char)) {
        textoValido += char;
      }
    }
    // Actualizamos la caja de texto solo con los caracteres permitidos
    this.inputText = textoValido;
  }

  // [C1]
  get outputText(): string {
    if (!this.inputText || !this.alphabet) return '';
    
    let result = '';
    const n = this.alphabet.length;

    for (let i = 0; i < this.inputText.length; i++) {
      const char = this.inputText[i];
      // Buscamos la posición del carácter en el abecedario personalizado
      const index = this.alphabet.indexOf(char);

      // Si el usuario introduce algo que no está en el abecedario se deja intacto
      if (index === -1) {
        result += char;
      } else {
        let newIndex = 0;

        if (this.metodoCifrado === 'cesar') {
          if (this.action === 'cifrar') {
            newIndex = (index + this.shift) % n; //suma
          } else { //decifrar
            newIndex = (index - this.shift) % n;
            if (newIndex < 0) newIndex += n; //resta
          }
        } else if (this.metodoCifrado === 'atbash') {
          // Invertimos la posición en base al tamaño exacto de el abecedario
          newIndex = (n - 1) - index;
        }

        result += this.alphabet[newIndex];
      }
    }
    
    return result;
  }

  // [D]
  copiarAlPortapapeles() {
    if (!this.outputText) return;

    navigator.clipboard.writeText(this.outputText).then(() => {
      this.copiadoExitoso = true;
      setTimeout(() => {
        this.copiadoExitoso = false;
      }, 2000);
    }).catch(err => {
      console.error('Error al copiar: ', err);
    });
  }

  // [D1]
  invertirProceso() {
    if (!this.outputText) return;

    // Pasamos el texto cifrado a la caja de entrada
    this.inputText = this.outputText;

    // Invertimos la acción del selector
    this.action = this.action === 'cifrar' ? 'descifrar' : 'cifrar';

    // Se recalculará el outputText automáticamente
  }

}

