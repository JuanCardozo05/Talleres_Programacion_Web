import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class Calculadora extends JFrame {

    private JTextField num1Field, num2Field, resultadoField;
    private JLabel num1Label, num2Label, resultadoLabel;
    private JButton sumaBtn, restaBtn, multiplicacionBtn, divisionBtn, potenciaBtn, raizCuadradaBtn, logaritmoBtn, senoBtn, cosenoBtn, tangenteBtn, moduloBtn, factorialBtn, inversoBtn, cuadradoBtn, cuboBtn, absBtn, expBtn, logBaseBtn, raizCubicaBtn, logNaturalBtn;

    public Calculadora() {
        // Configuración del JFrame
        setTitle("Calculadora Científica");
        setSize(500, 600);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLayout(new GridLayout(11, 2, 10, 10)); // Disposición de la ventana

        // Crear componentes
        num1Label = new JLabel("Número 1:");
        num1Field = new JTextField();
        num2Label = new JLabel("Número 2:");
        num2Field = new JTextField();
        resultadoLabel = new JLabel("Resultado:");
        resultadoField = new JTextField();
        resultadoField.setEditable(false); // Campo de resultado no editable

        sumaBtn = new JButton("Suma");
        restaBtn = new JButton("Resta");
        multiplicacionBtn = new JButton("Multiplicación");
        divisionBtn = new JButton("División");
        potenciaBtn = new JButton("Potencia");
        raizCuadradaBtn = new JButton("Raíz Cuadrada");
        logaritmoBtn = new JButton("Logaritmo");
        senoBtn = new JButton("Seno");
        cosenoBtn = new JButton("Coseno");
        tangenteBtn = new JButton("Tangente");
        moduloBtn = new JButton("Módulo");
        factorialBtn = new JButton("Factorial");
        inversoBtn = new JButton("Inverso");
        cuadradoBtn = new JButton("Cuadrado");
        cuboBtn = new JButton("Cubo");
        absBtn = new JButton("Valor Absoluto");
        expBtn = new JButton("Exponencial");
        logBaseBtn = new JButton("Logaritmo Base N");
        raizCubicaBtn = new JButton("Raíz Cúbica");
        logNaturalBtn = new JButton("Logaritmo Natural");

        // Añadir componentes al JFrame
        add(num1Label);
        add(num1Field);
        add(num2Label);
        add(num2Field);
        add(sumaBtn);
        add(restaBtn);
        add(multiplicacionBtn);
        add(divisionBtn);
        add(potenciaBtn);
        add(raizCuadradaBtn);
        add(logaritmoBtn);
        add(senoBtn);
        add(cosenoBtn);
        add(tangenteBtn);
        add(moduloBtn);
        add(factorialBtn);
        add(inversoBtn);
        add(cuadradoBtn);
        add(cuboBtn);
        add(absBtn);
        add(expBtn);
        add(logBaseBtn);
        add(raizCubicaBtn);
        add(logNaturalBtn);
        add(resultadoLabel);
        add(resultadoField);

        // Acción de los botones
        sumaBtn.addActionListener(new OperacionListener());
        restaBtn.addActionListener(new OperacionListener());
        multiplicacionBtn.addActionListener(new OperacionListener());
        divisionBtn.addActionListener(new OperacionListener());
        potenciaBtn.addActionListener(new OperacionListener());
        raizCuadradaBtn.addActionListener(new OperacionListener());
        logaritmoBtn.addActionListener(new OperacionListener());
        senoBtn.addActionListener(new OperacionListener());
        cosenoBtn.addActionListener(new OperacionListener());
        tangenteBtn.addActionListener(new OperacionListener());
        moduloBtn.addActionListener(new OperacionListener());
        factorialBtn.addActionListener(new OperacionListener());
        inversoBtn.addActionListener(new OperacionListener());
        cuadradoBtn.addActionListener(new OperacionListener());
        cuboBtn.addActionListener(new OperacionListener());
        absBtn.addActionListener(new OperacionListener());
        expBtn.addActionListener(new OperacionListener());
        logBaseBtn.addActionListener(new OperacionListener());
        raizCubicaBtn.addActionListener(new OperacionListener());
        logNaturalBtn.addActionListener(new OperacionListener());
    }

    // Clase interna para manejar los eventos de los botones
    private class OperacionListener implements ActionListener {
        public void actionPerformed(ActionEvent e) {
            try {
                double num1 = Double.parseDouble(num1Field.getText());
                double num2 = num2Field.getText().isEmpty() ? 0 : Double.parseDouble(num2Field.getText());
                double resultado = 0;

                if (e.getSource() == sumaBtn) {
                    resultado = num1 + num2;
                } else if (e.getSource() == restaBtn) {
                    resultado = num1 - num2;
                } else if (e.getSource() == multiplicacionBtn) {
                    resultado = num1 * num2;
                } else if (e.getSource() == divisionBtn) {
                    if (num2 != 0) {
                        resultado = num1 / num2;
                    } else {
                        JOptionPane.showMessageDialog(null, "No se puede dividir entre cero");
                        return;
                    }
                } else if (e.getSource() == potenciaBtn) {
                    resultado = Math.pow(num1, num2);
                } else if (e.getSource() == raizCuadradaBtn) {
                    resultado = Math.sqrt(num1);
                } else if (e.getSource() == logaritmoBtn) {
                    resultado = Math.log(num1);
                } else if (e.getSource() == senoBtn) {
                    resultado = Math.sin(Math.toRadians(num1));
                } else if (e.getSource() == cosenoBtn) {
                    resultado = Math.cos(Math.toRadians(num1));
                } else if (e.getSource() == tangenteBtn) {
                    resultado = Math.tan(Math.toRadians(num1));
                } else if (e.getSource() == moduloBtn) {
                    resultado = num1 % num2;
                } else if (e.getSource() == factorialBtn) {
                    resultado = factorial((int) num1);
                } else if (e.getSource() == inversoBtn) {
                    resultado = 1 / num1;
                } else if (e.getSource() == cuadradoBtn) {
                    resultado = num1 * num1;
                } else if (e.getSource() == cuboBtn) {
                    resultado = num1 * num1 * num1;
                } else if (e.getSource() == absBtn) {
                    resultado = Math.abs(num1);
                } else if (e.getSource() == expBtn) {
                    resultado = Math.exp(num1);
                } else if (e.getSource() == logBaseBtn) {
                    if (num2 > 0 && num2 != 1) {
                        resultado = Math.log(num1) / Math.log(num2);
                    } else {
                        JOptionPane.showMessageDialog(null, "La base del logaritmo debe ser mayor que 0 y diferente de 1");
                        return;
                    }
                } else if (e.getSource() == raizCubicaBtn) {
                    resultado = Math.cbrt(num1);
                } else if (e.getSource() == logNaturalBtn) {
                    resultado = Math.log1p(num1);
                }

                resultadoField.setText(String.valueOf(resultado));
            } catch (NumberFormatException ex) {
                JOptionPane.showMessageDialog(null, "Por favor, introduce números válidos.");
            }
        }

        private int factorial(int n) {
            if (n == 0 || n == 1) {
                return 1;
            } else {
                return n * factorial(n - 1);
            }
        }
    }

    // Método principal para ejecutar la calculadora
    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            Calculadora calculadora = new Calculadora();
            calculadora.setVisible(true);
        });
    }
}
