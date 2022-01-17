package server;

import javax.enterprise.context.ApplicationScoped;
import javax.faces.context.FacesContext;
import javax.inject.Named;
import java.io.Serializable;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Named("pointsBean")
@ApplicationScoped
public class PointsBean implements Serializable {

    private static final long serialVersionUID = 4L;
    private List<Point> points;
    private FacesContext facesContext;
    private String sessionId;

    public PointsBean() {
        facesContext = FacesContext.getCurrentInstance();
        sessionId = facesContext.getExternalContext().getSessionId(true);
        List list = PointDAO.getByOwner(sessionId);
        points = new LinkedList<>();
        for(final Object o : list) {
            points.add((Point) o);
        }
    }

    public void validate() {
        try {
            facesContext = FacesContext.getCurrentInstance();
            sessionId = facesContext.getExternalContext().getSessionId(true);
            Map<String, String> params = facesContext.getExternalContext().getRequestParameterMap();
            Point point = new Point(sessionId, Double.parseDouble(params.get("X-value")),Double.parseDouble(params.get("Y-value")), Double.parseDouble(params.get("R-value")));
            PointDAO.persist(point);
            points.add(point);
        } catch (Exception e) {
            System.out.println("//");
            e.printStackTrace();
            System.out.println(points);
            System.out.println("//");
        }
    }

    public List<Point> getPoints() {
        return points;
    }

    public void setPoints(List<Point> points) {
        this.points = points;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PointsBean)) return false;
        PointsBean that = (PointsBean) o;
        return Objects.equals(points, that.points);
    }

    @Override
    public int hashCode() {
        return Objects.hash(points);
    }

    @Override
    public String toString() {
        return "points = "+points+"\n";
    }
}