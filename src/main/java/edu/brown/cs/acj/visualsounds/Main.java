package edu.brown.cs.acj.visualsounds;

import java.io.File;
import java.io.IOException;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;


import com.clarifai.api.ClarifaiClient;
import com.clarifai.api.RecognitionRequest;
import com.clarifai.api.RecognitionResult;
import com.clarifai.api.Tag;
import com.google.common.collect.ImmutableMap;
import com.google.gson.Gson;

import freemarker.template.Configuration;
import joptsimple.OptionParser;
import joptsimple.OptionSet;
import spark.ModelAndView;
import spark.QueryParamsMap;
import spark.Request;
import spark.Response;
import spark.Route;
import spark.Spark;
import spark.TemplateViewRoute;
import spark.template.freemarker.FreeMarkerEngine;

/**
 * High-level control of bacon program. Manages system exiting.
 *
 * @author acj
 *
 */
public final class Main {

	/**
	 * main method for bacon.
	 *
	 * @param args
	 *            args from command line.
	 * @throws IOException
	 *             if file doens't exist.
	 * @throws SQLException
	 *             if the database can't be accessed.
	 * @throws ClassNotFoundException
	 *             if the SQL connection is invalid.
	 */
	public static void main(String[] args) {

		new Main(args).run();
	}

	private String[] args;
	private static final Gson GSON = new Gson();

	private Main(String[] args) {
		this.args = args;
	}

	private void run() {
		OptionParser parser = new OptionParser();
		parser.accepts("gui");
		OptionSet options = parser.parse(args);

		runSparkServer();

	}

	/**
	 * Runs the spark server.
	 */
	private void runSparkServer() {
		Spark.externalStaticFileLocation("src/main/resources/static");

		FreeMarkerEngine freeMarker = createEngine();

		// Setup Spark Routes
		Spark.get("/index.html", new FrontHandler(), freeMarker);
		Spark.post("/imageContents", new ImageRecognizer());
	}

	/**
	 * creates freemarker engine.
	 * 
	 * @return
	 */
	private static FreeMarkerEngine createEngine() {
		Configuration config = new Configuration();
		File templates = new File("src/main/resources/spark/template/freemarker");
		try {
			config.setDirectoryForTemplateLoading(templates);
		} catch (IOException ioe) {
			System.out.printf("ERROR: Unable use %s for template loading.\n", templates);
			System.exit(1);
		}
		return new FreeMarkerEngine(config);
	}

	/**
	 * Handler for the homepage frontend.
	 * 
	 * @author idk
	 */
	private class FrontHandler implements TemplateViewRoute {
		@Override
		public ModelAndView handle(Request req, Response res) {

			Map<String, String> variables = ImmutableMap.of("title", "HelpMe!");
			return new ModelAndView(variables, "index.html");
		}
	}
	
	private static class ImageRecognizer implements Route {
		@Override
		public Object handle(Request req, Response res) {
			QueryParamsMap qm = req.queryMap();
			String imgURL = qm.value("imgurl");
			System.out.println(imgURL);
			
			ClarifaiClient clarifai = new ClarifaiClient("YzMYgXRFeJXUQqUId1U9QsaID3Mg9tp5IuE8CIyy", "gpFtPGj3xh1ym2HDybq3buvPF3z4AtOodDTMVsp3");
			List<RecognitionResult> results = clarifai.recognize(new RecognitionRequest(imgURL));

//			for (Tag tag : results.get(0).getTags()) {
//				System.out.println(tag.getName() + ": " + tag.getProbability());
//			}
			
			System.out.println(results.get(0).getTags().get(0).getName());

//			return GSON.toJson(results.get(0).getTags().get(0).getName());
			return GSON.toJson(results.get(0).getTags());
		}
	}
}
