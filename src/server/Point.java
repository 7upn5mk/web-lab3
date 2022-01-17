package server;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Arrays;
import java.util.Date;

@Entity
@Table(name = "points")
public class Point implements Serializable {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Transient private static final long serialVersionUID = 4L;
    private String owner;
    private double x, y, r;
    private boolean hit;
    private Date bornDate;

    public Point(String owner, double x, double y, double r) {
        this.owner = owner;
        this.x = x;
        this.y = y;
        this.r = r;
        hit = check(x,y,r);
        bornDate = new Date();
    }

    public Point() {}

    private boolean check(double x, double y, double r) {
        return (x>=0&y>=0&x+y<=r/2)||(x>=0&&y<=0&&x*x+y*y<=r*r/4)||(x<=0&&y<=0&&x>=-r&&y>=-r/2);
    }

    @Override
    public String toString() {
        return "{x="+x+",y="+y +",r="+r+",hit="+ hit +",time="+bornDate+"}";
    }

    public long getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public double getR() {
        return r;
    }

    public void setR(double r) {
        this.r = r;
    }

    public boolean isHit() {
        return hit;
    }

    public void setHit(boolean hit) {
        this.hit = hit;
    }

    public Date getBornDate() {
        return bornDate;
    }

    public void setBornDate(Date bornDate) {
        this.bornDate = bornDate;
    }
}