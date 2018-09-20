package boxinator.rest.service.entity;

import javax.persistence.*;

@Entity
@Table (name = "box")
public class Box {

    @Id
    @Column(name="id")
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer id;

    private String name;
    private Double weight;
    private String color;
    private String destination;
    private Double cost;

    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getWeight() {
        return weight;
    }

    public void setWeight(Double weight) {
        this.weight = weight;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public Double getCost() {
        return cost;
    }

    public void setCost(Double cost) {
        this.cost = cost;
    }

    @Override
    public String toString() {
        return "Box{" + "id='" + id + '\''   + ", name='" + name + '\'' + ", weight='" + weight + '\'' + ", color='" + color + '\''
                + ", destination='" + destination + '\'' + ", cost='" + cost + '\'' + '}';
    }
}