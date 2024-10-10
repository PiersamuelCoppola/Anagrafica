package Anagrafica.demo.domain;
import lombok.Data;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Data
@Entity
@Table(name = "cittadino")
public class Cittadino {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    final Long id = null;
    @NotNull
    private String nome;
    @NotNull
    private String cognome;
    @NotNull
    private String cf;
    @NotNull
    private String indirizzo;
    @NotNull
    private String cellulare;

}
